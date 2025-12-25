'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { addToCart } from '@/service/cart/cart'
import { useLoginStore } from '@/stores/useLoginStore'
import type { ProductDetail } from '@/types/product'

export const useDetailPage = (product?: ProductDetail) => {
  const router = useRouter()
  const { user } = useLoginStore()

  const [dropdownValues, setDropdownValues] = useState({
    orderRegion: '',
    pickupStore: '',
    pickupDate: '',
  })
  const [localQuantity, setLocalQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleDropdownChange = (key: string, value: string) => {
    setDropdownValues((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const onIncreaseQuantity = () => setLocalQuantity((prev) => prev + 1)
  const onDecreaseQuantity = () =>
    setLocalQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleAddToCart = async () => {
    if (!user) {
      alert('로그인이 필요합니다.')
      router.push('/login')
      return
    }

    if (!product) {
      alert('상품 정보를 불러올 수 없습니다.')
      return
    }

    setIsAddingToCart(true)

    try {
      const productId = parseInt(product.id, 10)
      if (isNaN(productId)) {
        alert('상품 ID가 올바르지 않습니다.')
        return
      }

      const { data, error } = await addToCart(
        user.id,
        productId,
        localQuantity,
        {
          orderRegion: dropdownValues.orderRegion || undefined,
          pickupStoreName: dropdownValues.pickupStore || undefined,
          pickupDate: dropdownValues.pickupDate || undefined,
          priceAtAdded: product.price,
        }
      )

      if (error) {
        alert(error.message || '장바구니 추가에 실패했습니다.')
        return
      }

      alert('장바구니에 추가되었습니다.')
      router.push('/cart')
    } catch (err) {
      alert('장바구니 추가 중 오류가 발생했습니다.')
    } finally {
      setIsAddingToCart(false)
    }
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
    isAddingToCart,
  }
}
