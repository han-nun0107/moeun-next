'use client'

import { useQuery } from '@tanstack/react-query'

import { ItemRowContent, Pagination } from '@/components'
import { usePagination } from '@/hooks/my-page'
import { getOrders } from '@/service/my-page/order'
import { mapOrdersToItemRows } from '@/service/my-page/order.mapper'
import type { ItemRow } from '@/types/item-row'
import type { OrderItemTable, OrderTable } from '@/types/supabase/tables/order'

type OrderItemWithProduct = OrderItemTable['Row'] & {
  product_detail?: {
    id: string
    name: string
    description_image_url: string
  } | null
}

type OrderWithItems = OrderTable['Row'] & {
  order_items: OrderItemWithProduct[]
}

const Order = () => {
  const {
    data: orderRows,
    isLoading,
    error,
  } = useQuery<OrderWithItems[], Error, ItemRow[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data: orders, error } = await getOrders()
      if (error) throw error
      return (orders ?? []) as unknown as OrderWithItems[]
    },
    select: (orders) => mapOrdersToItemRows(orders),
  })

  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination({ perpage: 4, data: orderRows ?? [] })

  if (isLoading) {
    return (
      <section className="flex h-screen items-center justify-center">
        <p>주문 내역을 불러오는 중...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="flex h-screen items-center justify-center">
        <p>주문 내역을 불러오는 중 오류가 발생했습니다.</p>
      </section>
    )
  }

  return (
    <section className="flex h-screen flex-col gap-6">
      <article>
        <div className="min-h-160">
          <ItemRowContent items={currentItems} type="order" />
        </div>
        <div className="mt-8 flex w-320 justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </article>
    </section>
  )
}

export default Order
