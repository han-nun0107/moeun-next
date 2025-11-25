'use client'

import { ItemRowContent } from '@/components'
import Pagination from '@/components/common/Pagination'
import { usePagination } from '@/hooks/my-page/usePagination'
import { mockOrderData } from '@/mocks/itemRow'

const Order = () => {
  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination({ perpage: 4, mockData: mockOrderData })

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
