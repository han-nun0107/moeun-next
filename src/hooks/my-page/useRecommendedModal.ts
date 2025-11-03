import { useState } from 'react'

import { useModalState } from '@/hooks/useModalState'
import { RECOMMENDED } from '@/mocks/modal/recommended'

type RecommendedItem = (typeof RECOMMENDED)[number]

export const useRecommendedModal = () => {
  const {
    isOpen: isRecommendedModalOpen,
    openModal: openRecommendedModal,
    closeModal: closeRecommendedModal,
  } = useModalState()
  const {
    isOpen: isSelectCartModalOpen,
    openModal: openSelectCartModal,
    closeModal: closeSelectCartModal,
  } = useModalState()
  const [selectedItems, setSelectedItems] = useState<RecommendedItem[]>([])

  const LIST_DATA = RECOMMENDED.filter((item) => item.type === 'list').slice(
    0,
    3
  )
  const PACKAGE_DATA = RECOMMENDED.filter(
    (item) => item.type === 'package'
  ).slice(0, 3)

  const handleSelect = (id: number) => {
    const selectedItem = RECOMMENDED.find((item) => item.id === id)
    if (!selectedItem) return

    setSelectedItems((prev) =>
      prev.some((item) => item.id === id)
        ? prev.filter((item) => item.id !== id)
        : [...prev, selectedItem]
    )
  }

  return {
    isRecommendedModalOpen,
    openRecommendedModal,
    closeRecommendedModal,
    isSelectCartModalOpen,
    openSelectCartModal,
    closeSelectCartModal,
    selectedItems,
    onSelect: handleSelect,
    listData: LIST_DATA,
    packageData: PACKAGE_DATA,
  }
}
