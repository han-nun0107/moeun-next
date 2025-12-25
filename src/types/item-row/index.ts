// 공통 타입들
export * from './common'

// 장바구니 관련 타입들
export * from './cart'

// 주문 관련 타입들
export * from './order'

// 시음 관련 타입들
export * from './tasting'

// 필요한 타입들을 import
import type { Package } from './cart'
import type { BaseItemRow, Product, PickupStore } from './common'

// ItemRowLabel 컴포넌트 타입
export type ItemRowLabelType = {
  type?: 'cart' | 'order' | 'tasting'
  children?: React.ReactNode
  className?: string
}

export type ItemRow =
  | (BaseItemRow & {
      type: 'cart'
      detailId?: string | number
      checked?: boolean
      onCheckChange?: (checked: boolean) => void
      onQuantityChange?: (newQuantity: number) => void
      pickupName?: string
      pickupAddress?: string
      pickupContact?: string
      subtotal?: string
      image_url?: string | null
      pickup_store?: PickupStore
      product?: Product
      package?: Package
    })
  | (BaseItemRow & {
      type: 'order'
      order?: string
      order_date?: string
      reviewed?: boolean
      feedback_id?: number | null
      product?: Product
      pickup_store?: PickupStore
      user?: string
    })
  | (BaseItemRow & {
      type: 'tasting'
      order?: string
      feedback?: string
      sweetness: number
      acidity: number
      body: number
      carbonation: number
      aroma: number
      bitterness: number
      confidence?: number
      rating?: number
      created_at?: string
      product_name?: string
      image_url?: string
      comment?: string
      masked_username?: string
      view_count?: number
      has_image?: boolean
      product?: Product
    })
