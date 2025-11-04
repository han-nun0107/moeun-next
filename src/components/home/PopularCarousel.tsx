'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { SwiperSlide } from 'swiper/react'

import { Card } from '@/components'
import { IMAGE_URLS } from '@/constants'

const Carousel = dynamic(() => import('@/components/common/Carousel'), {
  ssr: false,
})

const PopularCarousel = () => {
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
      {IMAGE_URLS.Popular.Product.map((src, index) => (
        <SwiperSlide key={index}>
          <div className="flex flex-col items-center gap-5">
            <Link href={`/item/${index + 1}`}>
              <Card
                type="product"
                data={{
                  img: src,
                  alt: `Popular Product ${index + 1}`,
                  title: 'title',
                  subtitle: 'subTitle',
                  price: '₩29,000',
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
