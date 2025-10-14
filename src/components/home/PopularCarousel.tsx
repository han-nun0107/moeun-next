'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { SwiperSlide } from 'swiper/react'

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
      className="mt-12 w-full"
    >
      {IMAGE_URLS.Popular.Product.map((src, index) => (
        <SwiperSlide key={index}>
          <div className="flex flex-col gap-5">
            <Image
              src={src}
              alt={`Popular Banner ${index + 1}`}
              width={300}
              height={290}
              className="mx-auto h-auto object-cover"
            />
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg font-bold">title</p>
              <p className="text-[15px]">subTitle</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Carousel>
  )
}

export default PopularCarousel
