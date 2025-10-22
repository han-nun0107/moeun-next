import { Dispatch, SetStateAction, useState } from 'react'

import { AnswerType } from '@/types/gauge-bar/tasteTypes'
import { TestType } from '@/types/test/test'

export const useQuestionStep = ({
  testStep,
  setStep,
}: {
  testStep: number
  setStep: Dispatch<SetStateAction<TestType>>
}) => {
  const [answers, setAnswers] = useState<AnswerType>({})
  const [isClicked, setIsClicked] = useState<'A' | 'B' | null>(null)

  const handlerAnswer = (option: 'A' | 'B') => {
    setAnswers((prev) => ({
      ...prev,
      [`Q${testStep + 1}`]: option,
    }))
  }

  const saveResultToLocal = (resultData: AnswerType) => {
    try {
      localStorage.setItem('selectedAnswers', JSON.stringify(resultData))
    } catch (error: unknown) {
      if (error instanceof DOMException) {
        if (error.name === 'QuotaExceededError') {
          alert(
            '저장 용량을 초과했습니다. 일부 데이터를 삭제하고 다시 시도하세요.'
          )
        } else if (error.name === 'SecurityError') {
          alert('브라우저에서 로컬 저장소 접근이 차단되어 있습니다.')
        } else {
          alert('결과 저장 중 알 수 없는 오류가 발생했습니다.')
        }
      }
    }
  }

  const handleResult = () => {
    saveResultToLocal(answers)
    setStep('result')
  }

  return {
    isClicked,
    handlerAnswer,
    handleResult,
    setIsClicked,
  }
}
