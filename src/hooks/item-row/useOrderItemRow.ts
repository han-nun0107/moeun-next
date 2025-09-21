'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { UseOrderItemRowProps } from '@/types/item-row'

export const useOrderItemRow = ({
  id,
  reviewed,
  feedback_id,
  productId,
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
  }
}
