import { useState } from 'react'

type UsePaginationProps<T> = {
  perpage: number
  data?: T[]
}

export const usePagination = <T>({
  perpage,
  data = [],
}: UsePaginationProps<T>) => {
  const ITEMS_PER_PAGE = perpage

  const [currentPage, setCurrentPage] = useState(1)

  const totalPages =
    data.length === 0 ? 1 : Math.ceil(data.length / ITEMS_PER_PAGE)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentItems = data.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return {
    currentPage,
    totalPages,
    currentItems,
    handlePageChange,
  }
}
