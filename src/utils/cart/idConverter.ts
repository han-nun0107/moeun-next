export const convertCartId = (itemId: number | string): number | null => {
  const cartId = typeof itemId === 'string' ? parseInt(itemId, 10) : itemId
  return isNaN(cartId) ? null : cartId
}
