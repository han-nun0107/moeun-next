type CartItemWithProduct = {
  product_id: number
  product_detail?: { id: string; name: string } | null
}

export const formatOrderName = (cartItems: CartItemWithProduct[]): string => {
  if (cartItems.length === 0) {
    return '상품 결제'
  }

  const firstItem = cartItems[0]
  const firstProductName =
    firstItem?.product_detail?.name || `상품 ${firstItem.product_id}`

  if (cartItems.length === 1) {
    return firstProductName
  }

  return `${firstProductName} 외 ${cartItems.length - 1}건`
}
