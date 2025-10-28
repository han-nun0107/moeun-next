import { useState, useMemo } from 'react'

import RECOMMENDED from '@/mocks/main/recommended'
import { SliderVariantType } from '@/types/slider/slider'

const DEFAULT_VALUE = 0

export const useSearch = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const [sliderState, setSliderState] = useState<
    Record<SliderVariantType, number>
  >({
    sweetness: DEFAULT_VALUE,
    body: DEFAULT_VALUE,
    acidity: DEFAULT_VALUE,
    carbonation: DEFAULT_VALUE,
    bitter: DEFAULT_VALUE,
    aroma: DEFAULT_VALUE,
  })

  const ITEMS_PER_PAGE = 8

  const totalPages = Math.ceil(RECOMMENDED.length / ITEMS_PER_PAGE)

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return RECOMMENDED.slice(startIndex, endIndex)
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSliderChange = (key: SliderVariantType) => (value: number[]) => {
    setSliderState((prev) => ({
      ...prev,
      [key]: value[0],
    }))
  }
  return {
    currentPage,
    totalPages,
    currentItems,
    handlePageChange,
    handleSliderChange,
    sliderState,
  }
}
