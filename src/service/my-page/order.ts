import { supabase } from '@/utils/supabase'

import type { OrderWithItems } from './order.mapper'

export const getOrders = async (
  userId: string
): Promise<{
  data: OrderWithItems[] | null
  error: Error | null
}> => {
  const { data, error } = await supabase
    .from('orders')
    .select(`*, order_items:order_items(*)`)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) {
    return { data: null, error: new Error(error.message) }
  }
  return { data: (data ?? []) as OrderWithItems[], error: null }
}
