// hooks/useStarRating.ts
'use client'
import { useState } from 'react'

import type { UseStarRatingProps } from '@/types/starRating'

const useStarRating = ({
  rating: controlledRating,
  defaultRating = 0,
  readOnly = false,
  onChange,
}: UseStarRatingProps) => {
  const [internal, setInternal] = useState(defaultRating)
  const rating = controlledRating ?? internal

  const setRating = (val: number) => {
    if (readOnly) return
    setInternal(val)
    onChange?.(val)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (readOnly) return
    const { left, width } = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - left
    const fraction = x / width > 0.5 ? 1 : 0.5
    const newRating = index + fraction
    setRating(newRating)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, totalStars: number) => {
    if (readOnly) return
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault()
      setRating(Math.max(0, rating - 0.5))
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault()
      setRating(Math.min(totalStars, rating + 0.5))
    }
  }

  const getFillWidth = (index: number) => {
    if (index >= rating) return 0
    return Math.min(1, rating - index)
  }

  return { rating, handleClick, handleKeyDown, getFillWidth }
}

export default useStarRating
