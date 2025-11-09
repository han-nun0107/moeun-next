import Image from 'next/image'
import Link from 'next/link'

import { Button, Modal, StarRating } from '@/components'
import { IMAGE_URLS } from '@/constants'
import { ModalProps } from '@/types/modal/modal'
import maskingUserId from '@/utils/maskingUserId'

type ReviewModalProps = ModalProps & {
  review?: string
  imgSrc: string
  imgAlt: string
  product_name: string
  defaultRating: number
  userId: string
  date: string
  product_id: string
}

const ReviewModal = ({
  isOpen,
  onClose,
  review,
  imgSrc,
  imgAlt,
  product_name,
  defaultRating,
  userId,
  date,
  product_id,
}: ReviewModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="한 잔 취향 이 달의 후기"
      className="review-modal-scroll h-225 w-170 overflow-x-hidden overflow-y-auto"
    >
      <div>
        <Image
          src={imgSrc || IMAGE_URLS.Product.Default}
          alt={imgAlt || '모은 주류'}
          className="border-black-200 mt-14 mb-[34px] rounded-[10px] border"
          width={600}
          height={476}
        />
        <p className="pb-1 text-[40px]">{product_name}</p>
        <StarRating
          totalStars={5}
          readOnly
          defaultRating={defaultRating}
          size={25}
          showRatingValue={false}
          className="my-6"
        />
        <p className="text-black-200 mb-15 w-140 text-[22px]">{review}</p>
        <div className="mb-25 flex w-[250px] justify-between text-[22px] text-gray-700">
          <p> {userId ? maskingUserId(userId) : 'Unknown User'}</p>
          <p>{date ? date.slice(0, 10) : ''}</p>
        </div>
      </div>
      <Link href={`/item/${product_id}`}>
        <Button variant="FEEDBACK_SUBMIT">제품 상세보기</Button>
      </Link>
    </Modal>
  )
}

export default ReviewModal
