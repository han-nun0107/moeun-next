import { randomUUID } from 'crypto'

import { NextRequest, NextResponse } from 'next/server'

import { calculateTotalAmount } from '@/utils/order/calculateTotalAmount'
import { createOrderItems } from '@/utils/order/createOrderItems'
import { formatOrderName } from '@/utils/order/formatOrderName'
import { createSupabaseServerClient } from '@/utils/supabase/server-client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId } = body

    if (!userId) {
      return NextResponse.json({ message: 'Missing userId' }, { status: 400 })
    }

    const supabase = createSupabaseServerClient()

    const { data: cartItems, error: cartErr } = await supabase
      .from('cart')
      .select(
        `
        id, product_id, quantity, price_at_added, image_url, pickup_store_name, pickup_store_address, pickup_store_contact, pickup_date,
        product_detail:product_id (
          id,
          name
        )
        `
      )
      .eq('user_id', userId)

    if (cartErr) {
      return NextResponse.json(
        { message: 'Cart read failed', error: cartErr.message },
        { status: 500 }
      )
    }

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ message: 'Cart is empty' }, { status: 400 })
    }

    const totalAmount = calculateTotalAmount(cartItems)

    if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
      return NextResponse.json(
        { message: 'Invalid total amount' },
        { status: 400 }
      )
    }

    const orderId = randomUUID()
    const orderName = formatOrderName(cartItems)

    // ts-expect-error - Supabase 클라이언트의 insert 메소드 타입이 제대로 추론되지 않음
    const { data: order, error: orderErr } = await (supabase
      .from('orders')
      .insert({
        user_id: userId,
        order_id: orderId,
        order_name: orderName,
        total_amount: totalAmount,
        status: 'PENDING',
        order_date: new Date().toISOString(),
      } as never)
      .select('id, order_id, total_amount')
      .single() as unknown as Promise<{
      data: { id: number; order_id: string; total_amount: number } | null
      error: { message: string } | null
    }>)

    if (orderErr || !order) {
      return NextResponse.json(
        { message: 'Order create failed', error: orderErr?.message },
        { status: 500 }
      )
    }

    const itemsToInsert = createOrderItems(order.id, cartItems)

    // ts-expect-error - Supabase 클라이언트의 insert 메소드 타입이 제대로 추론되지 않음
    const { error: itemsErr } = await (supabase
      .from('order_items')
      .insert(itemsToInsert as never) as unknown as Promise<{
      error: { message: string } | null
    }>)

    if (itemsErr) {
      // ts-expect-error - Supabase 클라이언트의 update 메소드 타입이 제대로 추론되지 않음
      await (supabase
        .from('orders')
        .update({ status: 'FAILED' } as never)
        .eq('id', order.id) as unknown as Promise<{
        error: { message: string } | null
      }>)

      return NextResponse.json(
        { message: 'Order items create failed', error: itemsErr.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      orderId: order.order_id,
      amount: order.total_amount,
      orderName,
    })
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to create order'

    return NextResponse.json({ message: errorMessage }, { status: 500 })
  }
}
