import { getCurrentKSTISOString } from '@/utils/date/toKST'

type CartItem = {
  id: number
  product_id: number
  quantity: number
  price_at_added: number | null
  image_url: string | null
  pickup_store_name: string | null
  pickup_store_address: string | null
  pickup_store_contact: string | null
  pickup_date: string | null
  product_detail?: { id: string; name: string } | null
}

export const createOrderItems = (orderId: number, cartItems: CartItem[]) => {
  const now = getCurrentKSTISOString()

  return cartItems.map((item) => {
    const price = item.price_at_added || 0
    const quantity = item.quantity
    const productName = item.product_detail?.name || `상품 ${item.product_id}`

    return {
      order_id: orderId,
      product_id: item.product_id,
      quantity,
      price,
      subtotal: price * quantity,
      image_url: item.image_url ?? null,
      pickup_store_name: item.pickup_store_name ?? null,
      pickup_store_address: item.pickup_store_address ?? null,
      pickup_store_contact: item.pickup_store_contact ?? null,
      pickup_date: item.pickup_date || null,
      reviewed: false,
      cart_id: item.id,
      order_name: productName,
      created_at: now,
      updated_at: now,
    }
  })
}
