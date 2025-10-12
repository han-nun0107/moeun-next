'use client'

import NextIcon from '@/assets/icons/pagination/next.svg'
import PrevIcon from '@/assets/icons/pagination/prev.svg'
import Button from '@/components/common/Button'
import { usePagination } from '@/hooks/usePaginations'
import { cn } from '@/utils/cn'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  const { pages, onPagePrevious, onPageNext } = usePagination({
    currentPage,
    totalPages,
    onPageChange,
  })

  return (
    <nav
      aria-label="pagination"
      className={cn('flex items-center justify-center gap-4', className)}
    >
      {/* 이전 버튼 */}
      <Button
        variant="ICON"
        aria-label="이전 페이지"
        onClick={onPagePrevious}
        disabled={currentPage === 1}
        className={cn(currentPage === 1 ? '#E0E0E0' : '#F2544B')}
      >
        <img src={PrevIcon.src} alt="prev" />
      </Button>

      {/* 페이지 목록 */}
      <ol className="flex gap-2">
        {pages.map((page, idx) => {
          if (page === '...') {
            return (
              <li key={`dots-${idx}`}>
                <span className="px-2 text-gray-400 select-none">...</span>
              </li>
            )
          }

          return (
            <li key={page}>
              <Button
                aria-label={`${page} 페이지`}
                aria-current={page === currentPage ? 'page' : undefined}
                onClick={() => onPageChange(page as number)}
                variant="PAGINATION"
                className={cn(
                  page === currentPage &&
                    'bg-[#F2544B] font-semibold text-white'
                )}
              >
                {page}
              </Button>
            </li>
          )
        })}
      </ol>

      {/* 다음 버튼 */}
      <Button
        variant="ICON"
        aria-label="다음 페이지"
        onClick={onPageNext}
        disabled={currentPage === totalPages}
        className={cn(currentPage === totalPages ? '#E0E0E0' : '#F2544B')}
      >
        <img src={NextIcon.src} alt="next" />
      </Button>
    </nav>
  )
}

export default Pagination
