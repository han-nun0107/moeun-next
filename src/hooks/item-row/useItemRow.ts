'use client'

import { useState, useEffect } from 'react'

import type { ItemRow } from '@/types/item-row'
import { calculateSubtotal, parsePrice } from '@/utils/cart/priceCalculator'

const useItemRow = (items: ItemRow[]) => {
  const [itemList, setItemList] = useState<ItemRow[]>(items)

  useEffect(() => {
    setItemList(items)
  }, [items])

  const handleQuantityChange = (itemIndex: number, newQuantity: number) => {
    setItemList((prev) =>
      prev.map((item, index) => {
        if (index !== itemIndex) return item

        if (item.type === 'cart' && item.product) {
          const unitPrice = parsePrice(item.product.price)
          const subtotal = calculateSubtotal(unitPrice, newQuantity)

          return {
            ...item,
            quantity: newQuantity,
            subtotal,
          }
        }

        return { ...item, quantity: newQuantity }
      })
    )
  }

  return {
    itemList,
    handleQuantityChange,
  }
}

export default useItemRow
