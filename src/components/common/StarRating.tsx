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
  decimalPlaces = 1,
}: StarRatingProps & {
  fillColor?: string
  emptyColor?: string
  ariaLabel?: string
  decimalPlaces?: number
}) => {
  const { rating: currentRating, handleClick, getFillWidth } = useStarRating({
    rating, defaultRating, onChange, readOnly,
  })

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div
        className="flex items-center"
        role={readOnly ? undefined : 'radiogroup'}
        aria-label={readOnly ? undefined : ariaLabel}
      >
        {Array.from({ length: totalStars }).map((_, index) => {
          const checked = currentRating > index
          return (
            <div
              key={index}
              role={readOnly ? undefined : 'radio'}
              aria-checked={readOnly ? undefined : checked}
              aria-posinset={readOnly ? undefined : index + 1}
              aria-setsize={readOnly ? undefined : totalStars}
              tabIndex={readOnly ? -1 : 0}
              className={cn('relative select-none', readOnly ? 'cursor-default' : 'cursor-pointer')}
              onClick={readOnly ? undefined : (e) => handleClick(e, index)}
              style={{ width: size, height: size }}
            >
              <div
                style={{
                  ...maskStyle(StarIcon.src),
                  width: size,
                  height: size,
                  backgroundColor: emptyColor,
                }}
              />
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
          )
        })}
      </div>

      {showRatingValue && (
        <span className={cn('ml-2 font-bold text-[#333333]', readOnly ? 'text-base' : 'ml-5 text-5xl')}>
          {currentRating.toFixed(decimalPlaces)}
        </span>
      )}
    </div>
  )
}

export default StarRating
