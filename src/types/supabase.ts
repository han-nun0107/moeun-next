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
    }
  }
}
