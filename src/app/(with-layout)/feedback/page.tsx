'use client'

import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

import { getAllFeedback } from '@/service/my-page/feedback'
import type { FeedbackWithRelations } from '@/service/my-page/feedback'

const MonthlyFeedback = dynamic(
  () => import('@/components/feedback/MonthlyReview'),
  {
    ssr: false,
  }
)
const LiveFeedback = dynamic(() => import('@/components/feedback/LiveReview'), {
  ssr: false,
})
const SimilarFeedback = dynamic(
  () => import('@/components/feedback/SimilarReview'),
  {
    ssr: false,
  }
)

const Feedback = () => {
  const {
    data: feedbackData,
    isLoading,
    error,
  } = useQuery<FeedbackWithRelations[]>({
    queryKey: ['allFeedback'],
    queryFn: async () => {
      const result = await getAllFeedback()
      if (result.error) {
        throw result.error
      }
      return result.data || []
    },
  })

  if (isLoading) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        <p>피드백을 불러오는 중...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        <p>피드백을 불러오는 중 오류가 발생했습니다.</p>
      </section>
    )
  }

  return (
    <section className="flex min-h-screen w-full flex-col gap-25">
      <MonthlyFeedback feedbackData={feedbackData || []} />
      <LiveFeedback feedbackData={feedbackData || []} />
      <SimilarFeedback feedbackData={feedbackData || []} />
    </section>
  )
}

export default Feedback
