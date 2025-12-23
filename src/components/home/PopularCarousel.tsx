'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { SwiperSlide } from 'swiper/react'

import { Card } from '@/components'
import { usePopularProducts } from '@/hooks/product/usePopularProducts'

const Carousel = dynamic(() => import('@/components/common/Carousel'), {
  ssr: false,
})

const PopularCarousel = () => {
  const { products, isLoading } = usePopularProducts(6)

  if (isLoading) {
    return (
      <div className="mt-12 flex items-center justify-center">
        <div className="text-lg text-gray-600">인기 상품을 불러오는 중...</div>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return null
  }

  return (
    <Carousel
      slidesPerView={4}
      spaceBetween={0}
      autoplay={true}
      autoplayDelay={3000}
      loop={true}
      paginationType="none"
      navigation={true}
      navigationHeight={290}
      className="mt-12 w-full"
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <div className="flex flex-col items-center gap-5">
            <Link href={`/item/${product.id}`}>
              <Card
                type="product"
                data={{
                  img:
                    product.main_image_url ||
                    product.images[0]?.image_url ||
                    '',
                  alt: product.name,
                  title: product.name,
                  subtitle: product.drink?.brewery?.name || '',
                  price: product.final_price,
                }}
              />
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Carousel>
  )
}

export default PopularCarousel
