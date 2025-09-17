import DetailCard from '@/components/common/card/DetailCard'
import PackageModalCard from '@/components/common/card/PackageModalCard'
import ProductCard from '@/components/common/card/ProductCard'
import ReviewCard from '@/components/common/card/ReviewCard'
import TestCard from '@/components/common/card/TestCard'

export const cardMap = {
  product: ProductCard,
  test: TestCard,
  detail: DetailCard,
  review: ReviewCard,
  package: PackageModalCard,
} as const
