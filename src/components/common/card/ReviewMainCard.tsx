import Link from 'next/link'

import { StarRating, Button } from '@/components'
import { ReviewCardProps } from '@/types/card/card'
import maskingUserId from '@/utils/maskingUserId'

import CardImage from './CardImage'

const ReviewMainCard = ({
  nickname,
  feedback,
  rating,
  img,
  alt,
  createdAt,
  text = '15px',
  product_id,
}: ReviewCardProps) => {
  return (
    <div className="flex w-full gap-19">
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
          <p className="text-black-200 text-text-22">{feedback}</p>
        </div>
        <div className="mt-15 mb-[50px] flex gap-8">
          <p style={{ fontSize: text }} className="text-gray-600">
            {nickname ? maskingUserId(nickname) : 'Unknown User'}
          </p>
          <p style={{ fontSize: text }} className="text-gray-600">
            {createdAt}
          </p>
        </div>
        <Link href={`/item/${product_id}`}>
          <Button variant="REVIEW_BUTTON">이 전통주가 궁금하다면?</Button>
        </Link>
      </div>
    </div>
  )
}

export default ReviewMainCard
