import { NextRequest, NextResponse } from 'next/server'

import { Payment } from '@/types/toss/toss'
import { createSupabaseServerClient } from '@/utils/supabase/server-client'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const orderId = searchParams.get('orderId')
  const paymentKey = searchParams.get('paymentKey')
  const clientAmount = Number(searchParams.get('amount'))

  if (
    !orderId ||
    !paymentKey ||
    !clientAmount ||
    !Number.isFinite(clientAmount)
  ) {
    return NextResponse.json({ message: 'Invalid params' }, { status: 400 })
  }

  const secretKey = process.env.TOSS_SECRET_KEY
  if (!secretKey) {
    return NextResponse.json(
      { message: 'Missing TOSS_SECRET_KEY' },
      { status: 500 }
    )
  }

  let supabase
  try {
    supabase = createSupabaseServerClient()
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : 'Failed to initialize Supabase client',
      },
      { status: 500 }
    )
  }

  const { data: order, error: findErr } = await supabase
    .from('orders')
    .select('id, user_id, total_amount, status')
    .eq('order_id', orderId)
    .single()

  if (findErr || !order) {
    return NextResponse.json({ message: 'Order not found' }, { status: 404 })
  }

  if (order.status === 'COMPLETED') {
    return NextResponse.redirect(
      new URL(
        `/cart/complete?orderId=${encodeURIComponent(orderId)}`,
        request.url
      )
    )
  }

  if (order.status !== 'PENDING') {
    const failUrl = new URL(`/cart/fail`, request.url)
    failUrl.searchParams.set('code', 'INVALID_ORDER_STATUS')
    failUrl.searchParams.set('message', `Order status is ${order.status}`)
    return NextResponse.redirect(failUrl)
  }

  if (order.total_amount !== clientAmount) {
    const failUrl = new URL(`/cart/fail`, request.url)
    failUrl.searchParams.set('code', 'AMOUNT_MISMATCH')
    failUrl.searchParams.set('message', 'Client amount differs from DB amount')
    return NextResponse.redirect(failUrl)
  }

  const basicToken = Buffer.from(`${secretKey}:`).toString('base64')

  const response = await fetch(
    'https://api.tosspayments.com/v1/payments/confirm',
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount: order.total_amount,
      }),
    }
  )

  const responseText = await response.text()

  if (!response.ok) {
    await supabase
      .from('orders')
      .update({ status: 'FAILED' })
      .eq('id', order.id)

    try {
      const error = JSON.parse(responseText)
      const failUrl = new URL(`/cart/fail`, request.url)
      failUrl.searchParams.set('code', error.code)
      failUrl.searchParams.set('message', error.message)
      return NextResponse.redirect(failUrl)
    } catch {
      return new NextResponse(responseText, { status: response.status })
    }
  }

  let paymentResponse: Payment
  try {
    paymentResponse = JSON.parse(responseText)
  } catch {
    return new NextResponse(responseText, { status: 500 })
  }

  if (paymentResponse.totalAmount !== order.total_amount) {
    await supabase
      .from('orders')
      .update({ status: 'FAILED' })
      .eq('id', order.id)

    return NextResponse.json(
      {
        message: 'Payment amount verification failed',
        code: 'AMOUNT_MISMATCH',
      },
      { status: 400 }
    )
  }

  const { error: updErr } = await supabase
    .from('orders')
    .update({
      status: 'COMPLETED',
      payment_key: paymentKey,
      updated_at: new Date().toISOString(),
    })
    .eq('id', order.id)

  if (updErr) {
    return NextResponse.json(
      { message: 'Order update failed', error: updErr.message },
      { status: 500 }
    )
  }

  return NextResponse.redirect(
    new URL(
      `/cart/complete?orderId=${encodeURIComponent(orderId)}`,
      request.url
    )
  )
}
