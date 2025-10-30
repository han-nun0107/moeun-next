import { Button, Card, RetryIcon } from '@/components'
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
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d9d9d9] bg-[#fff]">
              <RetryIcon className="h-5 w-5 text-[#333]" />
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
              }}
            />
          ))}
        </div>
      </div>
    </article>
  )
}

export default LiveReview
