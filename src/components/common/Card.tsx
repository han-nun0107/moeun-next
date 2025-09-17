import type { ComponentProps } from 'react'

import DetailCard from '@/components/common/card/DetailCard'
import PackageModalCard from '@/components/common/card/PackageModalCard'
import ProductCard from '@/components/common/card/ProductCard'
import ReviewCard from '@/components/common/card/ReviewCard'
import TestCard from '@/components/common/card/TestCard'

type CardProps =
  | { type: 'product'; data: ComponentProps<typeof ProductCard> }
  | { type: 'test'; data: ComponentProps<typeof TestCard> }
  | { type: 'detail' }
  | { type: 'review'; data: ComponentProps<typeof ReviewCard> }
  | { type: 'package'; data: ComponentProps<typeof PackageModalCard> }

const Card = (props: CardProps) => {
  switch (props.type) {
    case 'product':
      return <ProductCard {...props.data} />
    case 'test':
      return <TestCard {...props.data} />
    case 'detail':
      return <DetailCard />
    case 'review':
      return <ReviewCard {...props.data} />
    case 'package':
      return <PackageModalCard {...props.data} />
    default:
      return null
  }
}

export default Card
