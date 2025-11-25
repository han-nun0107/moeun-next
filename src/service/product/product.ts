import { DB_TABLES } from '@/constants/supabase-db/dbTables'
import { supabase } from '@/utils/supabase'

export const getProducts = async () => {
  const { data, error } = await supabase.from(DB_TABLES.PRODUCTS).select('*')
  return { data, error }
}
