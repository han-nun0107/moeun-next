type CartItem = {
  price_at_added: number | null
  quantity: number
}

export const calculateTotalAmount = (cartItems: CartItem[]): number => {
  return cartItems.reduce((sum, item) => {
    const price = Number(item.price_at_added ?? 0)
    const quantity = Number(item.quantity ?? 0)
    return sum + price * quantity
  }, 0)
}
