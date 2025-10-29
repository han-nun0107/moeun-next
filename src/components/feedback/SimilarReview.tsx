import Image from 'next/image'

import refetchBtn from '@/assets/icons/review/refetch_btn.svg'
import { Card, Button } from '@/components'
import { liveReviewData } from '@/mocks/review/review'

const SimilarReview = () => {
  return (
    <article className="flex-center flex-col">
      <div>
        <h1 className="feedback-title">나와 비슷한 취향의 후기</h1>
        <div className="flex w-full items-center justify-between gap-2">
          <p>한 잔 취향을 이용한 고객님들의 실시간 후기</p>
          <Button variant="ICON" aria-label="나와 비슷한 취향의 후기 새로고침">
            <Image
              src={refetchBtn.src}
              alt="나와 비슷한 취향의 후기 새로고침"
              width={40}
              height={40}
            />
          </Button>
        </div>
        <div className="mt-[50px] mb-25 grid min-h-[320px] grid-cols-4 gap-8">
          {liveReviewData.map((item) => (
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

export default SimilarReview
