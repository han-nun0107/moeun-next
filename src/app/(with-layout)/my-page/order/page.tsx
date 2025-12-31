'use client'

import { ItemRowContent, Pagination } from '@/components'
import { useOrder, usePagination } from '@/hooks/my-page'

const Order = () => {
  const { data: orderRows, isLoading, error } = useOrder()

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
