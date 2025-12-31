import { Button, StarRating } from '@/components/common'
import { MY_PAGE } from '@/constants/my-page/myPage'
import { TastingReview } from '@/types/modal/feedback'
import { cn } from '@/utils/cn'

type ReviewStarTagProps = {
  review: TastingReview
  updateReview: (field: keyof TastingReview, value: number) => void
  selectedTags: string[]
  handleToggleTag: (tagValue: string) => void
}

const ReviewStarTag = ({
  review,
  updateReview,
  selectedTags,
  handleToggleTag,
}: ReviewStarTagProps) => {
  return (
    <>
      <div className="mt-12 flex w-full flex-col items-center">
        <p className="text-bold-lg text-black-200">전체 평점</p>
        <StarRating
          size={51}
          showRatingValue={false}
          className="mt-5"
          rating={review.rating}
          onChange={(value) => updateReview('rating', value)}
        />
      </div>
      <div className="mt-12 flex flex-wrap gap-2">
        {MY_PAGE.TASTE_TAGS.map((tag) => {
          const isSelected = selectedTags.includes(tag.value)
          return (
            <Button
              key={tag.value}
              variant="TAG"
              onClick={() => handleToggleTag(tag.value)}
              className={cn(
                'border-red-500',
                isSelected
                  ? 'text-white-100 bg-red-500'
                  : 'text-red-500 hover:bg-rose-50'
              )}
            >
              {tag.label}
            </Button>
          )
        })}
      </div>
      <p className="mt-3 text-xs text-gray-700">
        {MY_PAGE.MAX_SELECT_TAGS}개 선택 ({selectedTags.length}/
        {MY_PAGE.MAX_SELECT_TAGS})
      </p>
    </>
  )
}

export default ReviewStarTag
