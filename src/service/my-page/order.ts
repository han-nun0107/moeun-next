import { supabase } from '@/utils/supabase'

import type { OrderWithItems } from './order.mapper'

export const getOrders = async (): Promise<{
  data: OrderWithItems[] | null
  error: Error | null
}> => {
  const { data, error } = await supabase
    .from('orders')
    .select(`*, order_items:order_items(*)`)
  if (error) {
    return { data: null, error: new Error(error.message) }
  }
  return { data: (data ?? []) as OrderWithItems[], error: null }
}
