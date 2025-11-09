import { Button, Card, RetryIcon, ReviewModal } from '@/components'
import { useReviewModal } from '@/hooks/modal/useReviewModal'

const LiveReview = () => {
  const {
    isOpen,
    selectedReview,
    handleOpenModal,
    handleCloseModal,
    LIVE_MOCK_DATA,
  } = useReviewModal()

  return (
    <article className="flex-center flex-col">
      <div className="flex flex-col items-start justify-between">
        <h1 className="feedback-title">실시간 후기</h1>

        <div className="flex w-full items-center justify-between gap-2">
          <p className="text-lg text-gray-700">
            한 잔 취향을 이용한 고객님들의 실시간 후기
          </p>
          <Button variant="ICON" aria-label="실시간 후기 새로고침">
            <div className="flex-center bg-white-100 h-10 w-10 rounded-full border border-gray-300">
              <RetryIcon className="text-black-200 h-5 w-5" />
            </div>
          </Button>
        </div>

        <div className="mt-[50px] flex min-h-[320px] gap-8">
          {LIVE_MOCK_DATA.map((item) => (
            <Card
              key={item.id}
              type="review"
              data={{
                img: item.image,
                alt: item.alt,
                rating: item.rating,
                feedback: item.desc,
                nickname: item.nickname,
                createdAt: item.createdAt,
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
            userId={selectedReview.user_id ?? selectedReview.nickname}
            date={selectedReview.createdAt ?? ''}
            product_id={String(selectedReview.product_id ?? '')}
          />
        )}
      </div>
    </article>
  )
}

export default LiveReview
