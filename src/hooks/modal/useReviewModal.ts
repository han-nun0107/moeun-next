import { useState } from 'react'

import { useModalState } from '@/hooks/useModalState'
import { liveReviewData } from '@/mocks/review/review'
import { Review } from '@/types/review'

export const useReviewModal = () => {
  const { isOpen, openModal, closeModal } = useModalState()
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)

  const handleOpenModal = (review: Review) => {
    setSelectedReview(review)
    openModal()
  }

  const handleCloseModal = () => {
    setSelectedReview(null)
    closeModal()
  }

  const LIVE_MOCK_DATA = liveReviewData.slice(0, 4)

  return {
    isOpen,
    selectedReview,
    handleOpenModal,
    handleCloseModal,
    LIVE_MOCK_DATA,
  }
}
