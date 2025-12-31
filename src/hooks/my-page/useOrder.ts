'use client'

import { useQuery } from '@tanstack/react-query'

import {
  getOrders,
  type OrderWithItems,
  mapOrdersToItemRows,
} from '@/service/my-page'
import { useLoginStore } from '@/stores/useLoginStore'
import type { ItemRow } from '@/types/item-row'

export const useOrder = () => {
  const { user } = useLoginStore()
  const { data, isLoading, error } = useQuery<
    OrderWithItems[],
    Error,
    ItemRow[]
  >({
    queryKey: ['orders', user?.id],
    queryFn: async () => {
      if (!user?.id) {
        return []
      }
      const result = await getOrders(user.id)
      if (result.error) {
        throw result.error
      }
      return result.data ?? []
    },
    enabled: !!user?.id,
    select: (orders) => mapOrdersToItemRows(orders),
  })

  return {
    data,
    isLoading,
    error,
  }
}
