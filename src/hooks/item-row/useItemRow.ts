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
      prev.map((item, index) =>
        index === itemIndex ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  return {
    itemList,
    handleQuantityChange,
  }
}

export default useItemRow
