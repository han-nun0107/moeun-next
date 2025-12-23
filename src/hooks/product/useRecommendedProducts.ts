import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { getRecommendedProducts } from '@/service/product/product'
import type { ProductDetail } from '@/types/product'

const MAX_LIMIT = 20
const PAGE_SIZE = 4

const INITIAL_LIMIT = 8

export const useRecommendedProducts = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['recommendedProducts'],
    queryFn: async ({ pageParam = 0 }) => {
      const limit = pageParam === 0 ? INITIAL_LIMIT : PAGE_SIZE
      const result = await getRecommendedProducts(limit, pageParam)
      if (result.error) {
        throw result.error
      }
      if (!result.data) {
        throw new Error('추천 상품을 불러올 수 없습니다.')
      }
      return result.data
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.flat().length

      if (totalLoaded >= MAX_LIMIT || lastPage.length === 0) {
        return undefined
      }

      const currentPageIndex = allPages.length - 1
      const expectedLimit = currentPageIndex === 0 ? INITIAL_LIMIT : PAGE_SIZE
      if (lastPage.length < expectedLimit) {
        return undefined
      }

      return totalLoaded
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  })

  const products = useMemo(() => {
    if (!data) return []
    const allProducts = data.pages.flat()
    return allProducts.slice(0, MAX_LIMIT)
  }, [data])

  const canLoadMore = useMemo(() => {
    const hasReachedMaxLimit = products.length >= MAX_LIMIT
    return hasNextPage && !hasReachedMaxLimit
  }, [hasNextPage, products.length])

  return {
    products: products as ProductDetail[],
    isLoading,
    isError,
    error: error as Error | null,
    fetchNextPage,
    canLoadMore,
    isFetchingNextPage,
  }
}
