'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ReactNode, Children, ReactElement } from 'react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { cn } from '@/utils/cn'

type CarouselProps = {
  children: ReactNode
  slidesPerView?: number
  spaceBetween?: number
  autoplay?: boolean
  autoplayDelay?: number
  loop?: boolean
  paginationType?: 'bullets' | 'fraction' | 'progressbar' | 'none'
  navigation?: boolean
  className?: string
}

export default function Carousel({
  children,
  slidesPerView = 1,
  spaceBetween = 0,
  autoplay = false,
  autoplayDelay = 3000,
  loop = true,
  paginationType = 'bullets',
  navigation = false,
  className = '',
}: CarouselProps) {
  const slideElements = Children.toArray(children)

  const navigationPrevClass = 'swiper-button-prev-custom'
  const navigationNextClass = 'swiper-button-next-custom'

  return (
    <div className={cn('relative', className)}>
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        loop={loop}
        autoplay={
          autoplay
            ? { delay: autoplayDelay, disableOnInteraction: false }
            : undefined
        }
        pagination={
          paginationType !== 'none'
            ? { clickable: true, type: paginationType }
            : undefined
        }
        navigation={
          navigation
            ? {
                prevEl: `.${navigationPrevClass}`,
                nextEl: `.${navigationNextClass}`,
              }
            : false
        }
        className="w-full"
      >
        {slideElements.map((child, index) => {
          const element = child as ReactElement
          return <SwiperSlide key={element.key ?? index}>{element}</SwiperSlide>
        })}
      </Swiper>

      {navigation && (
        <>
          <button
            className={cn(`${navigationPrevClass} swiper-button-prev-custom`)}
            aria-label="이전"
          >
            <ChevronLeft />
          </button>
          <button
            className={cn(`${navigationNextClass} swiper-button-next-custom`)}
            aria-label="다음"
          >
            <ChevronRight />
          </button>
        </>
      )}
    </div>
  )
}
