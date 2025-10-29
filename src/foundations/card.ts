import {
  DetailCard,
  PackageModalCard,
  ProductCard,
  ReviewCard,
  ReviewMainCard,
  TestCard,
} from '@/components'

export const cardMap = {
  product: ProductCard,
  test: TestCard,
  detail: DetailCard,
  review: ReviewCard,
  package: PackageModalCard,
  reviewMain: ReviewMainCard,
} as const
