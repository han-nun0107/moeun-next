import { toZonedTime } from 'date-fns-tz'
import dynamic from 'next/dynamic'

import { Card } from '@/components'
import type { FeedbackWithRelations } from '@/service/my-page/feedback'
import { mapFeedbackToReview } from '@/service/my-page/feedback'
import { formatDateTime } from '@/utils/date/formatDate'

const KST_TIMEZONE = 'Asia/Seoul'

const Carousel = dynamic(() => import('@/components/common/Carousel'))

type MonthlyReviewProps = {
  feedbackData: FeedbackWithRelations[]
}

const MonthlyReview = ({ feedbackData }: MonthlyReviewProps) => {
  const now = toZonedTime(new Date(), KST_TIMEZONE)
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const monthlyData = feedbackData
    .filter((feedback) => {
      const feedbackDate = toZonedTime(
        new Date(feedback.created_at),
        KST_TIMEZONE
      )
      return (
        feedbackDate.getMonth() === currentMonth &&
        feedbackDate.getFullYear() === currentYear
      )
    })
    .slice(0, 4)
    .map(mapFeedbackToReview)

  if (monthlyData.length === 0) {
    return null
  }

  return (
    <article>
      <div className="flex h-200 w-full flex-col items-center bg-gray-50">
        <h2 className="text-black-200 text-bold-text-40 mt-25">
          한 잔 취향 이 달의 후기
        </h2>
        <div className="mt-15 h-123 w-360">
          <Carousel
            slidesPerView={1}
            spaceBetween={0}
            autoplay={false}
            autoplayDelay={3000}
            paginationType="none"
            navigation={true}
            navigationHeight={290}
            type="monthly"
          >
            {monthlyData.map((item) => (
              <Card
                key={item.id}
                type="reviewMain"
                data={{
                  text: '22px',
                  img: item.image,
                  alt: item.alt,
                  rating: item.rating,
                  feedback: item.desc,
                  nickname: item.nickname,
                  createdAt: formatDateTime(item.createdAt),
                  product_id: String(item.product_id ?? item.id),
                }}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </article>
  )
}

export default MonthlyReview
