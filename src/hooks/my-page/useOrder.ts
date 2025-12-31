'use client'

import { useQuery } from '@tanstack/react-query'

import { getOrders } from '@/service/my-page/order'
import type { OrderWithItems } from '@/service/my-page/order.mapper'
import { mapOrdersToItemRows } from '@/service/my-page/order.mapper'
import type { ItemRow } from '@/types/item-row'

export const useOrder = () => {
  const { data, isLoading, error } = useQuery<
    OrderWithItems[],
    Error,
    ItemRow[]
  >({
    queryKey: ['orders'],
    queryFn: async () => {
      const result = await getOrders()
      if (result.error) {
        throw result.error
      }
      return result.data ?? []
    },
    select: (orders) => mapOrdersToItemRows(orders),
  })

  return {
    data: data as ItemRow[] | undefined,
    isLoading,
    error,
  }
}
