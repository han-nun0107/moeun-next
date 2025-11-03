'use client'

import { useEffect, useMemo, useState } from 'react'

import { CartResponse } from '@/types/item-row'

type UseCartItemLogicParams = {
  quantity: number | undefined
  id?: string | number
  data?: CartResponse
  onQuantityChange?: (quantity: number) => void
}

const useCartItem = ({ quantity, data }: UseCartItemLogicParams) => {
  const [localQuantity, setLocalQuantity] = useState(() => quantity || 0)
  const [checkedItems, setCheckedItems] = useState<number[]>([])
  const [cartData, setCartData] = useState<CartResponse | undefined>(data)

  useEffect(() => {
    setLocalQuantity(quantity || 0)
  }, [quantity])

  useEffect(() => {
    setCartData(data)
  }, [data])

  const onIncreaseQuantity = (): void => {
    setLocalQuantity((prev) => prev + 1)
  }

  const onDecreaseQuantity = (): void => {
    if (localQuantity <= 1) return
    setLocalQuantity((prev) => prev - 1)
  }

  const onCheckChange = (itemId: number | string, isChecked: boolean) => {
    const numericId = Number(itemId)
    setCheckedItems((prev) =>
      isChecked ? [...prev, numericId] : prev.filter((id) => id !== numericId)
    )
  }

  const checkedTotalPrice = useMemo(() => {
    if (!cartData?.cart_items) return 0
    return cartData.cart_items
      .filter((item) => checkedItems.includes(item.id as number))
      .reduce((total, item) => total + parseFloat(item.subtotal || '0'), 0)
  }, [cartData, checkedItems])

  const updateQuantityAndTotals = (
    itemId: number | string,
    newQuantity: number
  ) => {
    setCartData((prev) => {
      if (!prev?.cart_items) return prev
      const cart_items = prev.cart_items.map((ci) => {
        if (String(ci.id) !== String(itemId)) return ci
        const priceValue = ci.product?.price
        const unitPrice =
          typeof priceValue === 'string'
            ? parseFloat(priceValue)
            : (priceValue ?? 0)
        const subtotal = String(unitPrice * newQuantity)
        return { ...ci, quantity: newQuantity, subtotal }
      })
      return { ...prev, cart_items }
    })
  }

  return {
    localQuantity,
    onIncreaseQuantity,
    onDecreaseQuantity,
    checkedItems,
    onCheckChange,
    checkedTotalPrice,
    data: cartData,
    updateQuantityAndTotals,
  }
}

export default useCartItem
