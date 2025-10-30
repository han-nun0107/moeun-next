'use client'

import { ItemRowContent } from '@/components'
import Pagination from '@/components/common/Pagination'
import { usePagination } from '@/hooks/my-page/usePagination'
import { mockTastingData } from '@/mocks/itemRow'

const History = () => {
  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination({ perpage: 3, mockData: mockTastingData })

  return (
    <section className="flex h-screen flex-col gap-6">
      <article>
        <div className="min-h-126">
          <ItemRowContent items={currentItems} type="tasting" />
        </div>
        <div className="mt-13 flex w-320 justify-center">
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

export default History
