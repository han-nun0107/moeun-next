'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { SwiperSlide } from 'swiper/react'

import { Button } from '@/components'
import { CarouselProps } from '@/types/carousel/carousel'
import { cn } from '@/utils/cn'

const Carousel = dynamic(() => import('@/components/common/Carousel'), {
  ssr: false,
})

const BannerCarousel = ({
  text,
  image,
  variant,
  className,
  gap = 7,
  type = 'main',
}: CarouselProps) => {
  return (
    <div className="relative min-h-[600px] w-full overflow-hidden">
      <div
        className={cn(
          'absolute inset-0 z-10 ml-80 flex flex-col items-start justify-center',
          {
            'gap-5': gap === 5,
            'gap-7': gap === 7,
            'gap-10': gap === 10,
          }
        )}
      >
        <p className={cn(className)}>{text.title}</p>
        <div className={cn('flex flex-col gap-10')}>
          <div className="text-black-200 text-[40px] leading-[1.4] font-bold">
            <h3>{text.content}</h3>
            {text.content2 && <p>{text.content2}</p>}
            {text.content3 && <p>{text.content3}</p>}
          </div>
          <Link href={'/test'} aria-label="테스트로 이동">
            <Button variant={variant}>
              {type === 'main' ? '지금 테스트하러 가기' : '구매하기'}
            </Button>
          </Link>
        </div>
      </div>
      <Carousel
        slidesPerView={1}
        spaceBetween={0}
        autoplay
        autoplayDelay={3000}
        loop={false}
        paginationType="none"
        navigation={false}
        className="w-full"
      >
        <SwiperSlide>
          <Image
            src={image.img}
            alt={image.alt}
            width={1920}
            height={600}
            priority
            fetchPriority="high"
            className="h-[600px] w-full object-cover"
          />
        </SwiperSlide>
      </Carousel>
    </div>
  )
}

export default BannerCarousel
