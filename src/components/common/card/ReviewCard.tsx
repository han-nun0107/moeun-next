import { StarRating } from '@/components'
import { ReviewCardProps } from '@/types/card/card'

import CardImage from './CardImage'

const ReviewCard = ({
  nickname,
  feedback,
  rating,
  img,
  alt,
  createdAt,
  text = '15px',
  onClick,
}: ReviewCardProps) => {
  return (
    <div
      className="w-[300px] cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (!onClick) return

        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onClick()
        }
      }}
    >
      <CardImage
        img={img}
        alt={alt}
        width={300}
        height={290}
        className="h-[290px] w-full"
      />
      <div className="mt-3">
        <div className="mb-2 flex items-center justify-between">
          <StarRating
            readOnly
            rating={rating}
            showRatingValue={false}
            fillColor="#f2544b"
            size={17}
          />
          <p className="text-sm leading-relaxed">{feedback}</p>
        </div>
        <div>
          <p style={{ fontSize: text }} className="text-gray-600">
            {nickname}
          </p>
          <p style={{ fontSize: text }} className="text-gray-600">
            {createdAt}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
