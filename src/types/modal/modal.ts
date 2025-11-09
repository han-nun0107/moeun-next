import { RECOMMENDED } from '@/mocks/modal/recommended'
import type { Review } from '@/types/review'

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  orderItemId?: number
}

type RecommendedItem = (typeof RECOMMENDED)[number]

export type RecommendedModalProps = ModalProps & {
  selectedItems: RecommendedItem[]
  onSelect: (id: number) => void
  listData: RecommendedItem[]
  packageData: RecommendedItem[]
  onAddToCart: () => void
}

export type MonthlyReviewModalData = Review & {
  product_name?: string
  product_id?: number
}
