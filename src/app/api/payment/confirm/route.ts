import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const orderId = searchParams.get('orderId')
  const paymentKey = searchParams.get('paymentKey')
  const amount = Number(searchParams.get('amount'))

if (!orderId || !paymentKey || !amount || !Number.isFinite(amount)) {
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

  const r = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentKey, orderId, amount }),
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

  // confirm 성공하면 payment 객체가 옴
  // DB 저장 가능
  return NextResponse.redirect(
    new URL(
      `/cart/complete?orderId=${encodeURIComponent(orderId)}`,
      request.url
    )
  )
}
