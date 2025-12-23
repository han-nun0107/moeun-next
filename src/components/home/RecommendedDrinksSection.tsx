'use client'

import Link from 'next/link'

import { Card } from '@/components'
import { ProductTitle } from '@/components/home'
import { useRecommendedProducts } from '@/hooks/product/useRecommendedProducts'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { MainSectionProps } from '@/types/main/mainSection'

const RecommendedDrinksSection = ({ title, desc }: MainSectionProps) => {
  const {
    products,
    isLoading,
    fetchNextPage,
    canLoadMore,
    isFetchingNextPage,
  } = useRecommendedProducts()

  const observerTarget = useInfiniteScroll({
    enabled: canLoadMore,
    onLoadMore: fetchNextPage,
    isLoading: isFetchingNextPage,
  })

  if (isLoading) {
    return (
      <section className="flex-center pb-25">
        <div className="flex w-320 flex-col gap-[50px]">
          <ProductTitle title={title} desc={desc} />
          <div className="flex items-center justify-center">
            <div className="text-lg text-gray-600">
              추천 상품을 불러오는 중...
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="flex-center pb-25">
      <div className="flex w-320 flex-col gap-[50px]">
        <ProductTitle title={title} desc={desc} />

        <div className="grid grid-cols-4 gap-[27px]">
          {products.map((product) => (
            <Link key={product.id} href={`/item/${product.id}`}>
              <Card
                type="product"
                data={{
                  img: product.main_image_url || '',
                  alt: product.name,
                  title: product.name,
                  subtitle: '',
                  price: product.final_price,
                }}
              />
            </Link>
          ))}
        </div>

        {canLoadMore && (
          <div ref={observerTarget} className="flex justify-center py-4">
            {isFetchingNextPage && (
              <div className="text-lg text-gray-600">
                더 많은 상품을 불러오는 중...
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default RecommendedDrinksSection
