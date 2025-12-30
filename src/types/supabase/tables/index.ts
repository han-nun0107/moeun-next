import type { Json } from '../common'

import type { CartTable } from './cart'
import type { OrderItemTable, OrderTable } from './order'
import type { ProductDetailTable } from './product_detail'

export type QuestionsTable = {
  Row: {
    question_id: number
    question_text: string
    option_a_text: string
    option_b_text: string
    category: string
  }
  Insert: {
    question_id?: number
    question_text: string
    option_a_text: string
    option_b_text: string
    category: string
  }
  Update: {
    question_id?: number
    question_text?: string
    option_a_text?: string
    option_b_text?: string
    category?: string
  }
}

export type UserResponsesTable = {
  Row: {
    user_id: string
    question_id: number
    selected_option: string
    score_value: number
    created_at: string
  }
  Insert: {
    user_id: string
    question_id: number
    selected_option: string
    score_value: number
    created_at?: string
  }
  Update: {
    user_id?: string
    question_id?: number
    selected_option?: string
    score_value?: number
    created_at?: string
  }
}

export type TasteProfileTable = {
  Row: {
    id: number
    sweetness: number
    acidity: number
    body: number
    carbonation: number
    bitterness: number
    aroma: number
    created_at: string
    updated_at: string
  }
  Insert: {
    id?: number
    sweetness: number
    acidity: number
    body: number
    carbonation: number
    bitterness: number
    aroma: number
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: number
    sweetness?: number
    acidity?: number
    body?: number
    carbonation?: number
    bitterness?: number
    aroma?: number
    created_at?: string
    updated_at?: string
  }
}

export type DrinkInfoTable = {
  Row: {
    id: number
    name: string
    brewery_id: number
    ingredients: string
    alcohol_type: string
    alcohol_type_display: string
    abv: number
    volume_ml: number
    created_at: string
    updated_at: string
  }
  Insert: {
    id?: number
    name: string
    brewery_id: number
    ingredients: string
    alcohol_type: string
    alcohol_type_display: string
    abv: number
    volume_ml: number
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: number
    name?: string
    brewery_id?: number
    ingredients?: string
    alcohol_type?: string
    alcohol_type_display?: string
    abv?: number
    volume_ml?: number
    created_at?: string
    updated_at?: string
  }
}

export type ProductImageTable = {
  Row: {
    id: number
    product_id: string
    image_url: string
    is_main: boolean
  }
  Insert: {
    id?: number
    product_id: string
    image_url: string
    is_main?: boolean
  }
  Update: {
    id?: number
    product_id?: string
    image_url?: string
    is_main?: boolean
  }
}

export type MoviesTable = {
  Row: {
    id: number
    name: string
    data: Json | null
  }
  Insert: {
    id?: never
    name: string
    data?: Json | null
  }
  Update: {
    id?: never
    name?: string
    data?: Json | null
  }
}

export type Tables = {
  movies: MoviesTable
  questions: QuestionsTable
  user_responses: UserResponsesTable
  taste_profile: TasteProfileTable
  drink_info: DrinkInfoTable
  product_image: ProductImageTable
  product_detail: ProductDetailTable
  cart: CartTable
  orders: OrderTable
  order_items: OrderItemTable
}
