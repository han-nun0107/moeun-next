import type { BaseItemRow, Product, PickupStore } from './common'

export type OrderItemRowProps = BaseItemRow & {
  order?: string
  reviewed?: boolean
  feedback_id?: number | null
  product?: Product
  pickup_store?: PickupStore
  order_date?: string
  user?: string
}

export type UseOrderItemRowProps = {
  id: BaseItemRow['id']
  reviewed: boolean
  feedback_id?: number | null
  productId?: Product['id']
  price?: OrderItemRowProps['price']
  quantity?: OrderItemRowProps['quantity']
  order?: OrderItemRowProps['order']
}

export type ButtonConfig = {
  variant: 'FEEDBACK' | 'BUY'
  text: string
  className: string
}
