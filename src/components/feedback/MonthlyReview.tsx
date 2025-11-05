import dynamic from 'next/dynamic'

import { Card } from '@/components'
import { monthlyReviewData } from '@/mocks/review/review'

const Carousel = dynamic(() => import('@/components/common/Carousel'))

const MonthlyReview = () => {
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
            {monthlyReviewData.map((item) => (
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
                  createdAt: item.createdAt,
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
