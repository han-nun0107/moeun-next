import { useQuery } from '@tanstack/react-query'

import { getQuestions } from '@/service/test/questions'
import { TestQuestionType } from '@/types/test/test'

export const useQuestions = () => {
  const {
    data: queryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['questions'],
    queryFn: getQuestions,
  })

  const questions: TestQuestionType[] =
    queryData?.data?.map((item) => ({
      id: item.question_id,
      question: item.question_text,
      options: {
        A: item.option_a_text,
        B: item.option_b_text,
      },
    })) || []

  return { questions, isLoading, error }
}
