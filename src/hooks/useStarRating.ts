'use client'

import { useState } from 'react'

import type { UseStarRatingProps } from '@/types/starRating'

const useStarRating = ({
  rating: controlledRating,
  defaultRating = 0,
  readOnly = false,
  onChange,
}: UseStarRatingProps) => {
  const [uncontrolled, setUncontrolled] = useState(defaultRating)
  const rating = controlledRating ?? uncontrolled

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (readOnly) return
    const { left, width } = e.currentTarget.getBoundingClientRect()
    const x = e.pageX - left
    const fraction = x / width > 0.5 ? 1 : 0.5
    const newRating = index + fraction
    setUncontrolled(newRating)
    onChange?.(newRating)
  }

  const getFillWidth = (index: number) => {
    if (index >= rating) return 0
    return Math.min(1, rating - index)
  }

  return { rating, handleClick, getFillWidth }
}

export default useStarRating
