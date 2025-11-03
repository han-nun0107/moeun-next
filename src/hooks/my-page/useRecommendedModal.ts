import { useState } from 'react'

import { RECOMMENDED } from '@/mocks/modal/recommended'

type RecommendedItem = (typeof RECOMMENDED)[number]

export const useRecommendedModal = () => {
  const [isRecommendedModalOpen, setIsRecommendedModalOpen] = useState(false)
  const [isSelectCartModalOpen, setIsSelectCartModalOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState<RecommendedItem[]>([])

  const openRecommendedModal = () => setIsRecommendedModalOpen(true)
  const closeRecommendedModal = () => setIsRecommendedModalOpen(false)

  const openSelectCartModal = () => setIsSelectCartModalOpen(true)
  const closeSelectCartModal = () => setIsSelectCartModalOpen(false)

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
