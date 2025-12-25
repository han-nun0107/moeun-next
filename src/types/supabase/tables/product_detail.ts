export type ProductDetailTable = {
  Row: {
    id: string
    name: string
    product_type: 'individual' | 'package'
    drink_id: number | null
    package_id: number | null
    price: number
    original_price: number | null
    discount: number | null
    discount_rate: number
    final_price: number
    is_on_sale: boolean
    description: string
    description_image_url: string
    is_gift_suitable: boolean
    is_award_winning: boolean
    is_regional_specialty: boolean
    is_limited_edition: boolean
    is_premium: boolean
    is_organic: boolean
    view_count: number
    order_count: number
    like_count: number
    review_count: number
    status: 'ACTIVE' | 'INACTIVE'
    created_at: string
    updated_at: string
  }
  Insert: {
    id?: string
    name: string
    product_type: 'individual' | 'package'
    drink_id?: number | null
    package_id?: number | null
    price: number
    original_price?: number | null
    discount?: number | null
    discount_rate: number
    final_price: number
    is_on_sale: boolean
    description: string
    description_image_url: string
    is_gift_suitable: boolean
    is_award_winning: boolean
    is_regional_specialty: boolean
    is_limited_edition: boolean
    is_premium: boolean
    is_organic: boolean
    view_count?: number
    order_count?: number
    like_count?: number
    review_count?: number
    status?: 'ACTIVE' | 'INACTIVE'
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: string
    name?: string
    product_type?: 'individual' | 'package'
    drink_id?: number | null
    package_id?: number | null
    price?: number
    original_price?: number | null
    discount?: number | null
    discount_rate?: number
    final_price?: number
    is_on_sale?: boolean
    description?: string
    description_image_url?: string
    is_gift_suitable?: boolean
    is_award_winning?: boolean
    is_regional_specialty?: boolean
    is_limited_edition?: boolean
    is_premium?: boolean
    is_organic?: boolean
    view_count?: number
    order_count?: number
    like_count?: number
    review_count?: number
    status?: 'ACTIVE' | 'INACTIVE'
    created_at?: string
    updated_at?: string
  }
}
