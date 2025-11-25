import { useQuery } from '@tanstack/react-query'

import { MONTHLY, PACKAGE_RECOMMENDED } from '@/mocks/index'
import { getProducts } from '@/service/product/product'
import { Product } from '@/types/product'

export const useProduct = (type: 'package' | 'individual') => {
  const {
    data: queryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  const apiProducts = queryData?.data || []
  const filteredProducts = apiProducts.filter(
    (product: Product) =>
      product.product_type === (type === 'package' ? 'package' : 'individual')
  )

  const products =
    filteredProducts.length > 0
      ? filteredProducts.slice(0, type === 'package' ? 4 : 3)
      : type === 'package'
        ? PACKAGE_RECOMMENDED.slice(0, 4)
        : MONTHLY.slice(0, 3)

  return { products, isLoading, error }
}
