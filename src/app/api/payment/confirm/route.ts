import { NextRequest, NextResponse } from 'next/server'

import type { OrderTable } from '@/types/supabase/tables/order'
import { Payment } from '@/types/toss/toss'
import { getCurrentKSTISOString } from '@/utils/date/toKST'
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

  type OrderResult = Pick<
    OrderTable['Row'],
    'id' | 'user_id' | 'total_amount' | 'status'
  >
  const typedOrder = order as OrderResult

  if (typedOrder.status === 'COMPLETED') {
    return NextResponse.redirect(
      new URL(
        `/cart/complete?orderId=${encodeURIComponent(orderId)}`,
        request.url
      )
    )
  }

  if (typedOrder.status !== 'PENDING') {
    const failUrl = new URL(`/cart/fail`, request.url)
    failUrl.searchParams.set('code', 'INVALID_ORDER_STATUS')
    failUrl.searchParams.set('message', `Order status is ${typedOrder.status}`)
    return NextResponse.redirect(failUrl)
  }

  if (typedOrder.total_amount !== clientAmount) {
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
        amount: typedOrder.total_amount,
      }),
    }
  )

  const responseText = await response.text()

  if (!response.ok) {
    // ts-expect-error - Supabase 클라이언트의 update 메소드 타입이 제대로 추론되지 않음
    await (supabase
      .from('orders')
      .update({
        status: 'FAILED',
        updated_at: getCurrentKSTISOString(),
      } as never)
      .eq('id', typedOrder.id) as unknown as Promise<{
      error: { message: string } | null
    }>)

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

  if (paymentResponse.totalAmount !== typedOrder.total_amount) {
    // ts-expect-error - Supabase 클라이언트의 update 메소드 타입이 제대로 추론되지 않음
    await (supabase
      .from('orders')
      .update({
        status: 'FAILED',
        updated_at: getCurrentKSTISOString(),
      } as never)
      .eq('id', typedOrder.id) as unknown as Promise<{
      error: { message: string } | null
    }>)

    return NextResponse.json(
      {
        message: 'Payment amount verification failed',
        code: 'AMOUNT_MISMATCH',
      },
      { status: 400 }
    )
  }

  // ts-expect-error - Supabase 클라이언트의 update 메소드 타입이 제대로 추론되지 않음
  const { error: updErr } = await (supabase
    .from('orders')
    .update({
      status: 'COMPLETED',
      payment_key: paymentKey,
      updated_at: getCurrentKSTISOString(),
    } as never)
    .eq('id', typedOrder.id) as unknown as Promise<{
    error: { message: string } | null
  }>)

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
