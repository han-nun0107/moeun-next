'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { addToCart } from '@/service/cart/cart'
import { useLoginStore } from '@/stores/useLoginStore'
import type { ProductDetail } from '@/types/product'

export const useDetailPage = (product?: ProductDetail) => {
  const router = useRouter()
  const { user } = useLoginStore()
  const queryClient = useQueryClient()

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

  const addToCartMutation = useMutation({
    mutationFn: async ({
      userId,
      productId,
      quantity,
      options,
    }: {
      userId: string
      productId: number
      quantity: number
      options?: {
        orderRegion?: string
        pickupStoreName?: string
        pickupDate?: string
        priceAtAdded?: number
        imageUrl?: string
      }
    }) => {
      const result = await addToCart(userId, productId, quantity, options)
      if (result.error) {
        throw result.error
      }
      return result.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.id] })
    },
    onError: (error: Error) => {
      alert(error.message || '장바구니 추가에 실패했습니다.')
    },
  })

  const performCartAction = (onSuccess: () => void) => {
    if (!user) {
      alert('로그인이 필요합니다.')
      router.push('/login')
      return
    }

    if (!product) {
      alert('상품 정보를 불러올 수 없습니다.')
      return
    }

    if (
      !dropdownValues.orderRegion ||
      !dropdownValues.pickupStore ||
      !dropdownValues.pickupDate
    ) {
      alert('주문 지역, 픽업 매장, 픽업 날짜를 모두 선택해주세요.')
      return
    }

    const productId = parseInt(product.id, 10)
    if (isNaN(productId)) {
      alert('상품 ID가 올바르지 않습니다.')
      return
    }

    addToCartMutation.mutate(
      {
        userId: user.id,
        productId,
        quantity: localQuantity,
        options: {
          orderRegion: dropdownValues.orderRegion || undefined,
          pickupStoreName: dropdownValues.pickupStore || undefined,
          pickupDate: dropdownValues.pickupDate || undefined,
          priceAtAdded: product.price,
          imageUrl: product.main_image_url,
        },
      },
      { onSuccess }
    )
  }

  const handleAddToCart = () => {
    performCartAction(() => {
      alert('장바구니에 추가되었습니다.')
    })
  }

  const handlePurchase = () => {
    performCartAction(() => {
      router.push('/cart')
    })
  }

  return {
    dropdownValues,
    handleDropdownChange,
    localQuantity,
    onIncreaseQuantity,
    onDecreaseQuantity,
    handleAddToCart,
    handlePurchase,
    isAddingToCart: addToCartMutation.isPending,
  }
}
