'use client'

import dynamic from 'next/dynamic'

const MonthlyFeedback = dynamic(() => import('@/components/feedback/MonthlyReview'), {
  ssr: false,
})
const LiveFeedback = dynamic(() => import('@/components/feedback/LiveReview'), {
  ssr: false,
})
const SimilarFeedback = dynamic(() => import('@/components/feedback/SimilarReview'), {
  ssr: false,
})

const Feedback = () => {
  return (
    <section className="flex min-h-screen w-full flex-col gap-25">
      <MonthlyFeedback />
      <LiveFeedback />
      <SimilarFeedback />
    </section>
  )
}

export default Feedback
