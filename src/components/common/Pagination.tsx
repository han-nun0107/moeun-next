'use client'

import NextIcon from '@/assets/icons/pagination/next.svg'
import PrevIcon from '@/assets/icons/pagination/prev.svg'
import { usePagination } from '@/hooks/usePaginations'
import { cn } from '@/utils/cn'

import Button from './Button'

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
      <Button
        variant="ICON"
        aria-label="이전 페이지"
        onClick={onPagePrevious}
        disabled={currentPage === 1}
      >
        <img
          src={PrevIcon.src}
          alt="prev"
          className={cn(currentPage === 1 ? '#E0E0E0' : '#F2544B')}
        />
      </Button>
      <ol className="flex gap-4">
        {pages.map((pageNumber) => {
          return (
            <li key={pageNumber}>
              <Button
                aria-label="페이지"
                aria-current={pageNumber === currentPage ? 'page' : undefined}
                onClick={() => onPageChange(pageNumber)}
                variant="PAGINATION"
                className={cn(
                  pageNumber === currentPage &&
                    'bg-[#F2544B] font-semibold text-white'
                )}
              >
                {pageNumber}
              </Button>
            </li>
          )
        })}
      </ol>
      <Button
        variant="ICON"
        aria-label="다음 페이지"
        onClick={onPageNext}
        disabled={currentPage === totalPages}
      >
        <img
          src={NextIcon.src}
          alt="next"
          className={cn(currentPage === totalPages ? '#E0E0E0' : '#F2544B')}
        />
      </Button>
    </nav>
  )
}

export default Pagination
