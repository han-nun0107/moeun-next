'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const useDetailPage = () => {
  const router = useRouter()

  const [dropdownValues, setDropdownValues] = useState({
    orderRegion: '',
    pickupStore: '',
    pickupDate: '',
  })
  const [localQuantity, setLocalQuantity] = useState(1)

  const handleDropdownChange = (key: string, value: string) => {
    setDropdownValues((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const onIncreaseQuantity = () => setLocalQuantity((prev) => prev + 1)
  const onDecreaseQuantity = () =>
    setLocalQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleAddToCart = () => {
    router.push(`/cart`)
  }
  const handlePurchase = () => {
    router.push(`/purchase`)
  }

  return {
    dropdownValues,
    handleDropdownChange,
    localQuantity,
    onIncreaseQuantity,
    onDecreaseQuantity,
    handleAddToCart,
    handlePurchase,
  }
}
