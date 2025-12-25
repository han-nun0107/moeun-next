import type { CartResponse } from '@/types/item-row'
import type { Database } from '@/types/supabase'

import { calculateSubtotal, calculateTotalPrice } from './priceCalculator'

type CartRow = Database['public']['Tables']['cart']['Row']

type CartRowWithProduct = CartRow & {
  product_detail?: {
    id: string
    name: string
    price: number
    description_image_url: string
  } | null
}

export const transformCartData = (
  cartRows: CartRowWithProduct[]
): CartResponse => {
  const cart_items = cartRows.map((row) => {
    const product = row.product_detail
    const price = row.price_at_added || product?.price || 0
    const subtotal = calculateSubtotal(price, row.quantity)

    return {
      id: row.id,
      product: {
        id: product?.id?.toString() || row.product_id.toString(),
        name: product?.name || '',
        price: price,
        main_image: product?.description_image_url || '',
      },
      quantity: row.quantity,
      subtotal,
      image_url: row.image_url || null,
      pickup_store: {
        id: row.id,
        name: row.pickup_store_name || '',
        address: row.pickup_store_address || '',
        contact: row.pickup_store_contact || '',
      },
      pickup_date: row.pickup_date || '',
      type: 'cart' as const,
    }
  })

  const total = calculateTotalPrice(cart_items)

  return {
    cart_items,
    results: cart_items,
    count: cart_items.length,
    next: null,
    previous: null,
    total_price: total,
    final_total: total,
  }
}

export type { CartRowWithProduct }
