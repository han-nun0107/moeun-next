'use client'

import { Button, Card, RetryIcon, ReviewModal } from '@/components'
import { useRefreshButton } from '@/hooks/feedback/useRefreshButton'
import { useReviewModal } from '@/hooks/modal/useReviewModal'
import type { FeedbackWithRelations } from '@/service/my-page/feedback'
import { mapFeedbackToReview } from '@/service/my-page/feedback'
import { formatDateTime } from '@/utils/date/formatDate'

type LiveReviewProps = {
  feedbackData: FeedbackWithRelations[]
}

const LiveReview = ({ feedbackData }: LiveReviewProps) => {
  const { isOpen, selectedReview, handleOpenModal, handleCloseModal } =
    useReviewModal()
  const { rotationKey, handleRefresh } = useRefreshButton()
  const liveData = feedbackData.slice(0, 4).map(mapFeedbackToReview)

  return (
    <article className="flex-center flex-col">
      <div>
        <h1 className="feedback-title">실시간 후기</h1>
        <div className="flex w-full items-center justify-between gap-2">
          <p>한 잔 취향을 이용한 고객님들의 실시간 후기</p>
          <Button
            variant="ICON"
            aria-label="실시간 후기 새로고침"
            onClick={handleRefresh}
          >
            <div className="flex-center bg-white-100 h-10 w-10 rounded-full border border-gray-300">
              <RetryIcon
                key={rotationKey}
                className="text-black-200 animate-spin-once h-5 w-5"
              />
            </div>
          </Button>
        </div>

        <div className="mt-[50px] mb-25 grid min-h-[320px] grid-cols-4 gap-8">
          {liveData.map((item) => (
            <Card
              key={item.id}
              type="review"
              data={{
                img: item.image,
                alt: item.alt,
                rating: item.rating,
                feedback: item.desc,
                nickname: item.nickname,
                createdAt: formatDateTime(item.createdAt),
                product_id: item.product_id
                  ? String(item.product_id)
                  : undefined,
                onClick: () => handleOpenModal(item),
              }}
            />
          ))}
        </div>
        {selectedReview && (
          <ReviewModal
            isOpen={isOpen}
            onClose={handleCloseModal}
            review={selectedReview.desc}
            imgSrc={selectedReview.image}
            imgAlt={selectedReview.alt}
            product_name={selectedReview.product_name ?? ''}
            defaultRating={selectedReview.rating}
            userId={selectedReview.nickname}
            date={formatDateTime(selectedReview.createdAt) ?? ''}
            product_id={String(selectedReview.product_id ?? '')}
          />
        )}
      </div>
    </article>
  )
}

export default LiveReview
