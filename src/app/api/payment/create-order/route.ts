import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId } = body

    if (!userId) {
      return NextResponse.json({ message: 'Missing userId' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        {
          message:
            'Missing Supabase env (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)',
        },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    // 1) cart 조회
    const { data: cartItems, error: cartErr } = await supabase
      .from('cart')
      .select(
        'id, product_id, quantity, price_at_added, image_url, pickup_store_name, pickup_store_address, pickup_store_contact, pickup_date'
      )
      .eq('user_id', userId)

    if (cartErr) {
      return NextResponse.json(
        { message: 'Cart read failed', cartErr },
        { status: 500 }
      )
    }

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ message: 'Cart is empty' }, { status: 400 })
    }

    // 2) 서버에서 총액 계산
    const totalAmount = cartItems.reduce((sum, it) => {
      const price = Number(it.price_at_added ?? 0)
      const qty = Number(it.quantity ?? 0)
      return sum + price * qty
    }, 0)

    if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
      return NextResponse.json(
        { message: 'Invalid total amount' },
        { status: 400 }
      )
    }

    // 3) Toss orderId는 너가 쓰던 UUID 유지
    const orderId = randomUUID()

    // 4) orderName 생성(원하는대로 변경 가능)
    const orderName =
      cartItems.length === 1
        ? `상품 ${cartItems[0].product_id}`
        : `상품 ${cartItems[0].product_id} 외 ${cartItems.length - 1}건`

    // 5) orders(PENDING) 생성
    const { data: order, error: orderErr } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        order_id: orderId,
        order_name: orderName,
        total_amount: totalAmount,
        status: 'PENDING',
        order_date: new Date().toISOString(),
      })
      .select('id, order_id, total_amount')
      .single()

    if (orderErr || !order) {
      return NextResponse.json(
        { message: 'Order create failed', orderErr },
        { status: 500 }
      )
    }

    // 6) order_items 생성 (cart -> order_items 복사)
    const itemsToInsert = cartItems.map((it) => {
      const price = Number(it.price_at_added ?? 0)
      const qty = Number(it.quantity ?? 0)
      return {
        order_id: order.id, // ⭐ orders.id (int8)
        product_id: it.product_id,
        quantity: qty,
        price,
        subtotal: price * qty,
        image_url: it.image_url ?? null,
        pickup_store_name: it.pickup_store_name ?? null,
        pickup_store_address: it.pickup_store_address ?? null,
        pickup_store_contact: it.pickup_store_contact ?? null,
        pickup_date: it.pickup_date
          ? new Date(it.pickup_date).toISOString()
          : null,
        reviewed: false,
        cart_id: it.id, // cart row id를 남겨두면 추적하기 좋음(선택)
      }
    })

    const { error: itemsErr } = await supabase
      .from('order_items')
      .insert(itemsToInsert)

    if (itemsErr) {
      // 실패 시 orders 상태 업데이트(간단 롤백)
      await supabase
        .from('orders')
        .update({ status: 'FAILED' })
        .eq('id', order.id)
      return NextResponse.json(
        { message: 'Order items create failed', itemsErr },
        { status: 500 }
      )
    }

    // ✅ Toss에 넘길 값 반환
    return NextResponse.json({
      orderId: order.order_id, // Toss로 보낼 orderId
      amount: order.total_amount, // Toss로 보낼 amount
      orderName, // Toss로 보낼 orderName
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create order', error: String(error) },
      { status: 500 }
    )
  }
}
