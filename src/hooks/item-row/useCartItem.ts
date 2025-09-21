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

  useEffect(() => {
    setLocalQuantity(quantity || 0)
  }, [quantity])

  const onIncreaseQuantity = (): void => {
    setLocalQuantity((prev) => prev + 1)
  }

  const onDecreaseQuantity = (): void => {
    setLocalQuantity((prev) => prev - 1)
  }

  const onCheckChange = (itemId: number, isChecked: boolean) => {
    setCheckedItems((prev) =>
      isChecked ? [...prev, itemId] : prev.filter((id) => id !== itemId)
    )
  }

  const checkedTotalPrice = useMemo(() => {
    if (!data?.cart_items) return 0
    return data.cart_items
      .filter((item) => checkedItems.includes(item.id as number))
      .reduce((total, item) => total + parseFloat(item.subtotal || '0'), 0)
  }, [data, checkedItems])

  return {
    localQuantity,
    onIncreaseQuantity,
    onDecreaseQuantity,
    checkedItems,
    onCheckChange,
    checkedTotalPrice,
  }
}

export default useCartItem
