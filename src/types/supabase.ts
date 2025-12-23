export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      movies: {
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
      questions: {
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
      user_responses: {
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
      taste_profile: {
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
      drink_info: {
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
      product_image: {
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
      product_detail: {
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
    }
  }
}
