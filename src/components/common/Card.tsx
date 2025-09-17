import type { ComponentProps, ReactElement } from 'react'

import { cardMap } from '@/foundations/card'

type CardType = keyof typeof cardMap

type CardProps = {
  [T in CardType]: { type: T; data: ComponentProps<(typeof cardMap)[T]> }
}[CardType]

const Card = (props: CardProps): ReactElement => {
  const Component = cardMap[props.type] as React.ComponentType<
    typeof props.data
  >
  return <Component {...props.data} />
}

export default Card
