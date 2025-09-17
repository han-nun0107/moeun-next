import TestImage from '@/assets/test.png'
import StarRating from '@/components/common/StarRating'

import CardImage from './CardImage'

const ReviewCard = ({
  nickname,
  feedback,
  rating,
}: {
  nickname: string
  feedback: string
  rating: number
}) => {
  return (
    <div className="w-[300px] flex-shrink-0">
      <CardImage
        src={TestImage}
        alt="짱구"
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
          <p className="text-sm text-gray-600">{nickname}</p>
        </div>
        <p className="text-sm leading-relaxed">{feedback}</p>
      </div>
    </div>
  )
}

export default ReviewCard
