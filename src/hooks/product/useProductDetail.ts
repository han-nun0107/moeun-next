import { useQuery } from '@tanstack/react-query'

import { getProductDetail } from '@/service/product/product'
import type { ProductDetail } from '@/types/product'

export const useProductDetail = (productId: string) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['productDetail', productId],
    queryFn: async () => {
      const result = await getProductDetail(productId)
      if (result.error) {
        throw result.error
      }
      if (!result.data) {
        throw new Error('상품 정보를 불러올 수 없습니다.')
      }
      return result.data
    },
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  })

  return {
    product: data as ProductDetail | undefined,
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
  }
}
