export type CartMockItem = {
  id: number
  detailId: number
  img: string
  name: string
  quantity: number
  price: string
  subtotal: string
  pickupName: string
  pickupAddress: string
  pickupContact: string
  checked: boolean
  product: {
    id: number
    name: string
    main_image: string
  }
  pickup_store: {
    name: string
    address: string
    contact: string
  }
}

type PickupStore = {
  id: number
  name: string
  address: string
  contact: string
}

type CartItem = {
  id: number
  product: {
    id: string
    name: string
    price: number
    main_image: string
  }
  quantity: number
  subtotal: string
  pickup_store: PickupStore
  pickup_date: string
}

type CartResponse = {
  count: number
  next: string | null
  previous: string | null
  results: CartItem[]
  cart_items: CartItem[]
  total_price: number
  final_total: number
}

export type UseCartItemLogicParams = {
  quantity: number | undefined
  id?: string | number
  data?: CartResponse
  onQuantityChange?: (quantity: number) => void
}
