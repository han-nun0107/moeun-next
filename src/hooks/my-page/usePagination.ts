'use client'

import { useState } from 'react'

import type { ItemRow } from '@/types/item-row'

type UsePaginationProps = {
  perpage: number
  mockData?: ItemRow[]
}

export const usePagination = ({
  perpage,
  mockData = [],
}: UsePaginationProps) => {
  const ITEMS_PER_PAGE = perpage

  const [currentPage, setCurrentPage] = useState(1)

  const totalPages =
    mockData.length === 0 ? 1 : Math.ceil(mockData.length / ITEMS_PER_PAGE)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentItems = mockData.slice(startIndex, endIndex)

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
