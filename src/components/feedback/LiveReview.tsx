import refetchBtn from '@/assets/icons/review/refetch_btn.svg'
import { Button, Card } from '@/components'
import { liveReviewData } from '@/mocks/review/review'

const LiveReview = () => {
  const LIVE_MOCK_DATA = liveReviewData.slice(0, 4)

  return (
    <article className="flex-center flex-col">
      <div className="flex flex-col items-start justify-between">
        <h1 className="feedback-title">실시간 후기</h1>

        <div className="flex w-full items-center justify-between gap-2">
          <p className="text-lg text-[#666]">
            한 잔 취향을 이용한 고객님들의 실시간 후기
          </p>
          <Button variant="ICON" aria-label="실시간 후기 새로고침">
            <img src={refetchBtn.src} alt="실시간 후기 새로고침" />
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
              }}
            />
          ))}
        </div>
      </div>
    </article>
  )
}

export default LiveReview
