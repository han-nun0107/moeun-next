import Slider from '@/components/common/Slider'
import { MY_PAGE } from '@/constants/my-page/myPage'
import type { TastingReview } from '@/types/modal/feedback'

type ReviewSliderProps = {
  review: TastingReview
  updateReview: (field: keyof TastingReview, value: number) => void
}

const ReviewSlider = ({ review, updateReview }: ReviewSliderProps) => {
  return (
    <div>
      <p className="text-black-200 border-b-2 pb-3 text-xl font-bold">
        시음 평가
      </p>
      <div className="mt-7 flex flex-col items-center gap-7">
        {MY_PAGE.TASTE_SLIDER.map((slider) => (
          <Slider
            key={slider.key}
            label={slider.label}
            variant={slider.variant}
            value={[review[slider.key as keyof TastingReview]]}
            onValueChange={(vals) =>
              updateReview(slider.key as keyof TastingReview, vals[0] ?? 0)
            }
          />
        ))}
      </div>
      <div className="mt-12 flex h-43 w-full flex-col justify-center gap-7 bg-gray-50">
        <p className="text-black-200 text-center text-xl font-bold">
          오늘 내 입맛 신뢰도는 몇 %인가요?
        </p>
        <Slider
          variant="trust"
          max={100}
          value={[review.confidence]}
          onValueChange={(vals) => updateReview('confidence', vals[0] ?? 0)}
        />
      </div>
    </div>
  )
}

export default ReviewSlider
