import { useQuery } from '@tanstack/react-query'

import { getPopularProducts } from '@/service/product/product'
import type { ProductDetail } from '@/types/product'

export const usePopularProducts = (limit = 6) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['popularProducts', limit],
    queryFn: async () => {
      const result = await getPopularProducts(limit)
      if (result.error) {
        throw result.error
      }
      if (!result.data) {
        throw new Error('인기 상품을 불러올 수 없습니다.')
      }
      return result.data
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  })

  return {
    products: data as ProductDetail[] | undefined,
    isLoading,
    isError,
    error: error as Error | null,
  }
}
