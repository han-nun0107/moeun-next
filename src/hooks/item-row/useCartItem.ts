'use client'

import { useEffect, useMemo, useState } from 'react'

import { CartResponse } from '@/types/item-row'

type UseCartItemLogicParams = {
  data?: CartResponse | null
}

const useCartItem = ({ data }: UseCartItemLogicParams) => {
  const [checkedItems, setCheckedItems] = useState<number[]>([])
  const [cartData, setCartData] = useState<CartResponse | undefined>(
    data || undefined
  )

  useEffect(() => {
    setCartData(data || undefined)
  }, [data])

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

  return {
    checkedItems,
    onCheckChange,
    checkedTotalPrice,
    data: cartData,
  }
}

export default useCartItem
