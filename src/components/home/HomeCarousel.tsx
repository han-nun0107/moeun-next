'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { SwiperSlide } from 'swiper/react'

import { Button } from '@/components'
import { IMAGE_URLS } from '@/constants'

const Carousel = dynamic(() => import('@/components/common/Carousel'), {
  ssr: false,
})

const HomeCarousel = () => {
  return (
    <div className="relative w-full">
      <div className="absolute top-1/2 left-1/2 z-10 flex h-95 w-320 -translate-x-1/2 -translate-y-1/2 flex-col gap-10">
        <p className="text-xl text-[#333]">
          너무 많은 전통주, 어떤 것이 내 취향일지 모르겠다구요?
        </p>
        <h3 className="text-[40px] font-bold text-[#333]">
          당신의 전통주 한 잔, <br />
          한 잔 취향만의 입맛 테스트를 통해 <br />
          당신의 맛을 찾아보세요!
        </h3>
        <Button variant="TEST">테스트하기</Button>
      </div>
      <Carousel
        slidesPerView={1}
        spaceBetween={0}
        autoplay
        autoplayDelay={3000}
        loop
        paginationType="none"
        navigation={false}
        className="w-full"
      >
        <SwiperSlide>
          <Image
            src={IMAGE_URLS.Banner.Main}
            alt="Main Banner"
            width={1920}
            height={650}
            priority
            className="w-full object-cover"
          />
        </SwiperSlide>
      </Carousel>
    </div>
  )
}

export default HomeCarousel
