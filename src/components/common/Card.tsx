import type { ComponentProps, ReactElement } from 'react'

import { cardMap } from '@/foundations/card'

type CardType = keyof typeof cardMap

type CardProps = {
  [K in CardType]: { type: K; data: ComponentProps<(typeof cardMap)[K]> }
}[CardType]

const renderers = {
  product: ({ data }: Extract<CardProps, { type: 'product' }>) => {
    const Component = cardMap.product
    return <Component {...data} />
  },
  test: ({ data }: Extract<CardProps, { type: 'test' }>) => {
    const Component = cardMap.test
    return <Component {...data} />
  },
  detail: ({ data }: Extract<CardProps, { type: 'detail' }>) => {
    const Component = cardMap.detail
    return <Component {...data} />
  },
  review: ({ data }: Extract<CardProps, { type: 'review' }>) => {
    const Component = cardMap.review
    return <Component {...data} />
  },
  package: ({ data }: Extract<CardProps, { type: 'package' }>) => {
    const Component = cardMap.package
    return <Component {...data} />
  },
} as const

const Card = (props: CardProps): ReactElement => {
  return renderers[props.type](props as never)
}

export default Card
