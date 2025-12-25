export const calculateSubtotal = (
  unitPrice: number | string,
  quantity: number
): string => {
  const price =
    typeof unitPrice === 'string' ? parseFloat(unitPrice) : (unitPrice ?? 0)
  return String(price * quantity)
}

export const parsePrice = (price: number | string | undefined): number => {
  if (typeof price === 'string') {
    return parseFloat(price) || 0
  }
  return price ?? 0
}

export const calculateTotalPrice = (
  items: Array<{ subtotal?: string | number }>
): number => {
  return items.reduce((total, item) => {
    const subtotal = parsePrice(item.subtotal)
    return total + subtotal
  }, 0)
}
