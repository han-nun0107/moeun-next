'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ReactNode, Children, ReactElement } from 'react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Button } from '@/components'
import { cn } from '@/utils/cn'

const NAV_BUTTONS = [
  { direction: 'prev', icon: <ChevronLeft />, label: '이전' },
  { direction: 'next', icon: <ChevronRight />, label: '다음' },
] as const

type CarouselProps = {
  children: ReactNode
  slidesPerView?: number
  spaceBetween?: number
  autoplay?: boolean
  autoplayDelay?: number
  loop?: boolean
  centeredSlides?: boolean
  paginationType?: 'bullets' | 'fraction' | 'progressbar' | 'none'
  navigation?: boolean
  navigationHeight?: number
  className?: string
}

const Carousel = ({
  children,
  slidesPerView = 1,
  spaceBetween = 0,
  autoplay = false,
  autoplayDelay = 3000,
  loop = true,
  paginationType = 'bullets',
  navigation = false,
  navigationHeight,
  className = '',
}: CarouselProps) => {
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
        <div
          className={cn(
            'absolute right-0 left-0',
            navigationHeight ? 'top-0' : 'top-1/2 -translate-y-1/2'
          )}
          style={navigationHeight ? { height: navigationHeight } : undefined}
        >
          <div className="relative h-full">
            {NAV_BUTTONS.map(({ direction, icon, label }) => (
              <Button
                key={direction}
                variant="ICON"
                className={cn(
                  direction === 'prev'
                    ? `${navigationPrevClass} swiper-button-prev-custom`
                    : `${navigationNextClass} swiper-button-next-custom`
                )}
                aria-label={label}
              >
                {icon}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Carousel
