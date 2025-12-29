import { randomUUID } from 'crypto'

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, orderName } = body

    if (!amount || !Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      return NextResponse.json({ message: 'Invalid amount' }, { status: 400 })
    }

    const orderId = randomUUID()

    return NextResponse.json({
      orderId,
      amount: Number(amount),
      orderName: orderName || '상품 결제',
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create order', error: String(error) },
      { status: 500 }
    )
  }
}
