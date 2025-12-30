export type OrderTable = {
  Row: {
    id: number
    user_id: string
    order_id: string
    payment_key: string | null
    order_name: string
    total_amount: number
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'FAILED'
    order_date: string
    created_at: string
    updated_at: string
  }
  Insert: {
    id?: number
    user_id: string
    order_id: string
    payment_key?: string | null
    order_name: string
    total_amount: number
    status?: 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'FAILED'
    order_date?: string
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: number
    user_id?: string
    order_id?: string
    payment_key?: string | null
    order_name?: string
    total_amount?: number
    status?: 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'FAILED'
    order_date?: string
    created_at?: string
    updated_at?: string
  }
}

export type OrderItemTable = {
  Row: {
    id: number
    order_id: number
    product_id: number
    quantity: number
    price: number
    subtotal: number
    image_url: string | null
    pickup_store_name: string | null
    pickup_store_address: string | null
    pickup_store_contact: string | null
    pickup_date: string | null
    reviewed: boolean
    feedback_id: number | null
    cart_id: number | null
    created_at: string
    updated_at: string
  }
  Insert: {
    id?: number
    order_id: number
    product_id: number
    quantity: number
    price: number
    subtotal: number
    image_url?: string | null
    pickup_store_name?: string | null
    pickup_store_address?: string | null
    pickup_store_contact?: string | null
    pickup_date?: string | null
    reviewed?: boolean
    feedback_id?: number | null
    cart_id?: number | null
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: number
    order_id?: number
    product_id?: number
    quantity?: number
    price?: number
    subtotal?: number
    image_url?: string | null
    pickup_store_name?: string | null
    pickup_store_address?: string | null
    pickup_store_contact?: string | null
    pickup_date?: string | null
    reviewed?: boolean
    feedback_id?: number | null
    cart_id?: number | null
    created_at?: string
    updated_at?: string
  }
}
