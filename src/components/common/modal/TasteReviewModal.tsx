'use client'
import { Button, Modal } from '@/components'
import { useTastingReview } from '@/hooks/my-page'
import { useLoginStore } from '@/stores/useLoginStore'
import { ModalProps } from '@/types/modal/modal'
import { getUsername } from '@/utils/getUsername'

import ReviewSlider from './ReviewSlider'
import ReviewStarTag from './ReviewStarTag'
import ReviewSummaryForm from './ReviewSummaryForm'

const TasteReviewModal = ({ isOpen, onClose, orderItemId }: ModalProps) => {
  const { user } = useLoginStore()
  const username = getUsername(user)
  const {
    review,
    updateReview,
    selectedTags,
    handleToggleTag,
    handleSubmitAndClose,
    comment,
    setComment,
    handleFileChange,
    imagePreviews,
  } = useTastingReview(orderItemId, onClose)
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="시음 후기 작성"
      isCloseable
      className="review-modal-scroll h-225 w-170 overflow-auto"
    >
      <div className="flex-center mt-5 flex-col text-lg text-gray-700">
        <p>제품이 {username}님의 취향에 맞으셨나요?</p>
        <p>
          시음 후기 작성을 통해 더 적합한 전통주를 추천받고, 나만의 시음 후기를
          통해
        </p>
        <p>나의 맛의 지문 정확도를 높여보세요!</p>
      </div>
      <div className="w-full">
        <ReviewSlider review={review} updateReview={updateReview} />
        <ReviewStarTag
          review={review}
          updateReview={updateReview}
          selectedTags={selectedTags}
          handleToggleTag={handleToggleTag}
        />
        <ReviewSummaryForm
          comment={comment}
          setComment={setComment}
          handleFileChange={handleFileChange}
          imagePreviews={imagePreviews}
        />
        <Button
          variant="FEEDBACK_SUBMIT"
          onClick={handleSubmitAndClose}
          className="mt-15"
        >
          소중한 시음 후기 등록하고 적립금 받기
        </Button>
      </div>
    </Modal>
  )
}

export default TasteReviewModal
