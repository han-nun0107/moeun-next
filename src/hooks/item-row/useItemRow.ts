'use client'

import { useState, useEffect } from 'react'

import type { ItemRow } from '@/types/item-row'

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
          const priceValue = item.product.price
          const unitPrice =
            typeof priceValue === 'string'
              ? parseFloat(priceValue)
              : (priceValue ?? 0)
          const subtotal = String(unitPrice * newQuantity)

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
