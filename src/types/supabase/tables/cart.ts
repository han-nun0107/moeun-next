export type CartTable = {
  Row: {
    id: number
    user_id: string
    product_id: number
    quantity: number
    order_region: string | null
    pickup_store_name: string | null
    pickup_store_address: string | null
    pickup_store_contact: string | null
    pickup_date: string | null
    price_at_added: number | null
    created_at: string
    updated_at: string
  }
  Insert: {
    id?: number
    user_id: string
    product_id: number
    quantity: number
    order_region?: string | null
    pickup_store_name?: string | null
    pickup_store_address?: string | null
    pickup_store_contact?: string | null
    pickup_date?: string | null
    price_at_added?: number | null
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: number
    user_id?: string
    product_id?: number
    quantity?: number
    order_region?: string | null
    pickup_store_name?: string | null
    pickup_store_address?: string | null
    pickup_store_contact?: string | null
    pickup_date?: string | null
    price_at_added?: number | null
    created_at?: string
    updated_at?: string
  }
}
