export type ItemRowType = 'cart' | 'order' | 'tasting'

export type BaseItemRow = {
  id?: string | number
  type?: ItemRowType
  img?: string
  name?: string
  quantity?: number
  price?: number | string
}

export type PickupStore = {
  name?: string
  address?: string
  contact?: string
}

export type Product = {
  id?: string | number
  name?: string
  price?: string | number
  main_image?: string
  main_image_url?: string
}
