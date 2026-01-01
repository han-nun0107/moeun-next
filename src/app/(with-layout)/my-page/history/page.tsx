'use client'

import { ItemRowContent, Pagination } from '@/components'
import { useHistory, usePagination } from '@/hooks/my-page'
import { useLoginStore } from '@/stores/useLoginStore'

const History = () => {
  const { user } = useLoginStore()
  const { data: feedbackRows, isLoading, error } = useHistory(user?.id)

  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination({ perpage: 3, data: feedbackRows ?? [] })

  if (isLoading) {
    return (
      <section className="flex h-screen items-center justify-center">
        <p>시음 히스토리를 불러오는 중...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="flex h-screen items-center justify-center">
        <p>시음 히스토리를 불러오는 중 오류가 발생했습니다.</p>
      </section>
    )
  }

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
