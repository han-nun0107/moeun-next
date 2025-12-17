import { DB_TABLES } from '@/constants/supabase-db/dbTables'
import { supabase } from '@/utils/supabase'

export const getProducts = async (type: 'package' | 'individual') => {
  const { data, error } = await supabase
    .from(DB_TABLES.PRODUCTS)
    .select('*')
    .eq('product_type', type)
  return { data, error }
}
