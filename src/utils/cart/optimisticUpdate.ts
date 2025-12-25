import type { CartResponse } from '@/types/item-row'

import {
  calculateSubtotal,
  calculateTotalPrice,
  parsePrice,
} from './priceCalculator'

export const updateCartItemOptimistically = (
  cartData: CartResponse,
  cartId: number | string,
  newQuantity: number
): CartResponse => {
  if (!cartData.cart_items) {
    return cartData
  }

  const cart_items = cartData.cart_items.map((item) => {
    if (String(item.id) === String(cartId)) {
      const unitPrice = parsePrice(item.product?.price)
      const subtotal = calculateSubtotal(unitPrice, newQuantity)
      return { ...item, quantity: newQuantity, subtotal }
    }
    return item
  })

  const total = calculateTotalPrice(cart_items)

  return {
    ...cartData,
    cart_items,
    total_price: total,
    final_total: total,
  }
}
