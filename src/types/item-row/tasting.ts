import type { BaseItemRow } from './common'

export type TastingItemRowProps = BaseItemRow & {
  order?: string
  feedback?: string
  sweetness?: string
  acidity?: string
  body?: string
  carbonation?: string
  aroma?: string
  bitterness?: string
  confidence?: string
  rating?: number
  created_at?: string
  product_name?: string
  image_url?: string
  comment?: string
  masked_username?: string
  view_count?: number
  has_image?: boolean
}

export type UseTasteDisplayParams = {
  sweetness?: string
  acidity?: string
  body?: string
  carbonation?: string
  aroma?: string
  bitterness?: string
  confidence?: string
}

export type TasteDisplayResult = {
  tasteDisplay: string
  confidenceDisplay: string
  fullTasteDisplay: string
}
