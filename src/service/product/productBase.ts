import { DB_TABLES } from '@/constants/supabase-db/dbTables'
import type { ProductDetail } from '@/types/product'
import type { Database } from '@/types/supabase'
import { supabase } from '@/utils/supabase'

export type ProductDetailRow =
  Database['public']['Tables']['product_detail']['Row']
export type ProductDetailUpdate =
  Database['public']['Tables']['product_detail']['Update']
export type DrinkInfoRow = Database['public']['Tables']['drink_info']['Row']
export type TasteProfileRow =
  Database['public']['Tables']['taste_profile']['Row']
export type ProductImageRow =
  Database['public']['Tables']['product_image']['Row']

export class ProductError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ProductError'
  }
}

export const createErrorResponse = <T>(message: string) => ({
  data: null as T,
  error: new ProductError(message),
})

export const createSuccessResponse = <T>(data: T) => ({
  data,
  error: null as Error | null,
})

export { DB_TABLES, supabase }
export type { ProductDetail }
