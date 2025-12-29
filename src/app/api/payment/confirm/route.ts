import { NextRequest, NextResponse } from 'next/server'

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

  const basicToken = Buffer.from(`${secretKey}:`).toString('base64')

  // 결제 확인 API 호출
  const r = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentKey, orderId, amount: clientAmount }),
  })

  const text = await r.text()
  if (!r.ok) {
    try {
      const error = JSON.parse(text)
      const failUrl = new URL(`/cart/fail`, request.url)
      failUrl.searchParams.set('code', error.code)
      failUrl.searchParams.set('message', error.message)
      return NextResponse.redirect(failUrl)
    } catch (e) {
      return new NextResponse(text, { status: r.status })
    }
  }

  try {
    const paymentResponse = JSON.parse(text)
    const actualAmount = paymentResponse.totalAmount

    if (Math.abs(actualAmount - clientAmount) > 0) {
      return NextResponse.json(
        {
          message: 'Payment amount verification failed',
          code: 'AMOUNT_MISMATCH',
        },
        { status: 400 }
      )
    }
  } catch (e) {
    return new NextResponse(text, { status: r.status })
  }

  // confirm 성공하면 payment 객체가 옴
  // TODO: DB에 주문 정보 저장 (orderId, amount, paymentKey 등)
  return NextResponse.redirect(
    new URL(
      `/cart/complete?orderId=${encodeURIComponent(orderId)}`,
      request.url
    )
  )
}
