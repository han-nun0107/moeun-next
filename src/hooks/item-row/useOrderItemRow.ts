'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { UseOrderItemRowProps } from '@/types/item-row'

export const useOrderItemRow = ({
  id,
  reviewed,
  feedback_id,
  productId,
  price,
  quantity,
  order,
}: UseOrderItemRowProps) => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const hasNotReviewed = reviewed === false

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleClick = () => {
    if (hasNotReviewed) {
      openModal()
    } else {
      const targetId = productId ?? feedback_id
      router.push(`/product/${targetId}`)
    }
  }

  const getOrderItemId = () => {
    return typeof id === 'string' ? Number(id) : id
  }

  const numericPrice = typeof price === 'number' ? price : Number(price ?? 0)
  const numericQuantity =
    typeof quantity === 'number' ? quantity : Number(quantity ?? 0)
  const totalPrice = numericPrice * numericQuantity
  const orderString = String(order ?? '')
  const datePart = orderString.slice(0, 10)
  const timePart = orderString.slice(11, 19)
  const orderDate = `${datePart} ${timePart}`

  const getButtonConfig = () => ({
    variant: hasNotReviewed ? ('FEEDBACK' as const) : ('BUY' as const),
    text: hasNotReviewed ? '후기 남기기' : '본품 구매하기',
    className: hasNotReviewed ? 'text-[#333333]' : 'text-white',
  })

  return {
    isModalOpen,
    hasNotReviewed,
    handleClick,
    closeModal,
    getOrderItemId,
    getButtonConfig,
    totalPrice,
    orderDate,
  }
}
