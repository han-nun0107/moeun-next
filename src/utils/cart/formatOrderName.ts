import type { CartResponse } from '@/types/item-row'

export const formatOrderName = (
  cartData: CartResponse | null | undefined,
  checkedItems: (number | string)[]
): string => {
  if (!cartData?.cart_items || checkedItems.length === 0) {
    return '상품 결제'
  }

  const checkedCartItems = cartData.cart_items.filter((item) => {
    const itemId = item.id
    return checkedItems.some(
      (checkedId) =>
        String(itemId) === String(checkedId) ||
        Number(itemId) === Number(checkedId)
    )
  })

  if (checkedCartItems.length === 0) {
    return '상품 결제'
  }

  const firstItemName = checkedCartItems[0]?.product?.name || '상품'
  const remainingCount = checkedCartItems.length - 1

  if (remainingCount === 0) {
    return firstItemName
  }

  return `${firstItemName} 외 ${remainingCount}건`
}
