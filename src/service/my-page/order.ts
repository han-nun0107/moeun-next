import { OrderTable } from '@/types/supabase/tables/order'
import { supabase } from '@/utils/supabase'

export const getOrders = async (): Promise<{
  data: OrderTable[] | null
  error: Error | null
}> => {
  const { data, error } = await supabase
    .from('orders')
    .select(`*, order_items:order_items(*)`)
  if (error) {
    return { data: null, error: new Error(error.message) }
  }
  return { data: data as OrderTable[], error: null }
}
