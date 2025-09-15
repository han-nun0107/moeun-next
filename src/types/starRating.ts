export type StarRatingProps = {
  totalStars?: number
  rating?: number
  defaultRating?: number
  onChange?: (value: number) => void
  readOnly?: boolean
  showRatingValue?: boolean
  size?: number
  className?: string
  fillColor?: string
  emptyColor?: string
  ariaLabel?: string
}

export type UseStarRatingProps = {
  rating?: number
  defaultRating?: number
  onChange?: (value: number) => void
  readOnly?: boolean
}
