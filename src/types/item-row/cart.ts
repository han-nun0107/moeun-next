import type { BaseItemRow, Product, PickupStore } from './common'

export type PackageItem = {
  id?: string
  name?: string
}

export type Package = {
  id?: number
  name?: string
  price?: string | number
  items?: PackageItem[]
}

export type CartSingleItem = {
  id?: string | number
  product?: Product
  quantity?: number
  pickup?: string
  subtotal?: string
  image_url?: string | null
}

export type CartPackageItem = {
  id?: string | number
  cart_package_id?: number
  quantity?: number
  package?: Package
  pickup?: string
  subtotal?: string
}

export type CartMockDataType = {
  id: number
  customer: number
  single_items: CartSingleItem[]
  packages: CartPackageItem[]
  total_price: string
  final_total: string
  created_at: string
  updated_at: string
}

export type CartItemRowProps = BaseItemRow & {
  detailId?: string | number
  checked?: boolean
  onCheckChange?: (checked: boolean) => void
  onQuantityChange?: (newQuantity: number) => void
  pickupName?: string
  pickupAddress?: string
  pickupContact?: string
  product?: Product
  subtotal?: string
  pickup_store?: PickupStore
}

export type ItemRowListProps = Omit<CartItemRowProps, 'onQuantityChange'> & {
  onQuantityChange?: (itemIndex: number, newQuantity: number) => void
}

export type UseCartItemLogicParams = {
  quantity: number | undefined
  id?: string | number
  data?: CartResponse
  onQuantityChange?: (quantity: number) => void
}

export type CartResponse = {
  cart_items?: CartSingleItem[]
  results?: CartSingleItem[]
  count?: number
  next?: string | null
  previous?: string | null
  total_price?: number
  final_total?: number
}

export type QuantityInputProps = {
  value: number
  onIncrease: () => void
  onDecrease: () => void
}
