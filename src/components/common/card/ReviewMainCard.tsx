import { StarRating, Button } from '@/components'
import { ReviewCardProps } from '@/types/card/card'

import CardImage from './CardImage'

const ReviewMainCard = ({
  nickname,
  feedback,
  rating,
  img,
  alt,
  createdAt,
  text = '15px',
}: ReviewCardProps) => {
  return (
    <div className="flex w-[300px] cursor-pointer gap-19">
      <CardImage
        img={img}
        alt={alt}
        width={620}
        height={492}
        className="rounded-[10px]"
      />
      <div className="mt-3 flex flex-col items-start justify-center">
        <div className="mb-2 flex flex-col items-start justify-between gap-6">
          <StarRating
            readOnly
            rating={rating}
            showRatingValue={false}
            fillColor="#f2544b"
            size={17}
          />
          <p className="text-[22px] text-[#333]">{feedback}</p>
        </div>
        <div className="mt-15 mb-[50px] flex gap-8">
          <p className={`text-[${text}] text-gray-600`}>{nickname}</p>
          <p className={`text-[${text}] text-gray-600`}>{createdAt}</p>
        </div>
        <Button variant="REVIEW_BUTTON">이 전통주가 궁금하다면?</Button>
      </div>
    </div>
  )
}

export default ReviewMainCard
