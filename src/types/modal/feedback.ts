import { TasteScoreMap } from '@/types/gauge-bar/tasteTypes'

export type TastingReview = {
  sweetness: number
  acidity: number
  body: number
  confidence: number
  carbonation: number
  bitter: number
  aroma: number
  rating: number
}

export type TastingSubmitData = {
  order_item_id: number
  user_name: string
  sweetness: number
  acidity: number
  body: number
  confidence: number
  carbonation: number
  bitter: number
  aroma: number
  overall_rating: number
  taste_tag: string[]
  comment?: string
  files?: File[] | null
}

export type TasteProfile = {
  id: number
  taste_scores: TasteScoreMap
  description: string
}
