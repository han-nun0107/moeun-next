'use client'

import StarIcon from '@/assets/icons/star-rating/star-rating.svg'
import useStarRating from '@/hooks/useStarRating'
import type { StarRatingProps } from '@/types/starRating'
import { cn } from '@/utils/cn'

const maskStyle = (src: string) => ({
  WebkitMaskImage: `url(${src})`,
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  WebkitMaskSize: 'contain',
  maskImage: `url(${src})`,
  maskRepeat: 'no-repeat',
  maskPosition: 'center',
  maskSize: 'contain',
})

const StarRating = ({
  totalStars = 5,
  rating,
  defaultRating = 0,
  onChange,
  readOnly = false,
  showRatingValue = true,
  size = 24,
  className,
  fillColor = '#f2544b',
  emptyColor = '#f2f2f2',
  ariaLabel = '별점 선택',
}: StarRatingProps) => {
  const { rating: currentRating, handleClick, handleKeyDown, getFillWidth } = useStarRating({
    rating,
    defaultRating,
    onChange,
    readOnly,
  })

  return (
    <div
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={totalStars}
      aria-valuenow={currentRating}
      tabIndex={readOnly ? -1 : 0}
      className={cn(
        'flex items-center gap-1 outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0',
        readOnly ? 'cursor-default' : 'cursor-pointer',
        className
      )}
      onKeyDown={(e) => handleKeyDown(e, totalStars)}
    >
      {Array.from({ length: totalStars }).map((_, index) => (
        <div
          key={index}
          className="relative select-none"
          onClick={(e) => !readOnly && handleClick(e, index)}
          style={{ width: size, height: size }}
        >
          {/* 빈 별 */}
          <div
            style={{
              ...maskStyle(StarIcon.src),
              width: size,
              height: size,
              backgroundColor: emptyColor,
            }}
          />
          {/* 채워진 별 */}
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{ width: `${getFillWidth(index) * 100}%`, height: size }}
          >
            <div
              style={{
                ...maskStyle(StarIcon.src),
                width: size,
                height: size,
                backgroundColor: fillColor,
              }}
            />
          </div>
        </div>
      ))}

      {showRatingValue && (
        <span
          className={cn(
            'ml-2 font-bold text-[#333333]',
            readOnly ? 'text-base' : 'ml-5 text-5xl'
          )}
        >
          {currentRating.toFixed(1)}
        </span>
      )}
    </div>
  )
}

export default StarRating
