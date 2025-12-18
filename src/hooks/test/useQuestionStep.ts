import { Dispatch, SetStateAction, useState } from 'react'

import { LOCAL_STORAGE_KEYS } from '@/constants/test/localStorage'
import {
  saveUserResponses,
  UserResponseData,
} from '@/service/test/userResponses'
import { useLoginStore } from '@/stores/useLoginStore'
import { AnswerType } from '@/types/gauge-bar/tasteTypes'
import { TestType } from '@/types/test/test'

const getScoreValue = (option: 'A' | 'B'): number => {
  return option === 'A' ? 5 : 1
}

const convertAnswersToResponseData = (
  answers: AnswerType
): UserResponseData[] => {
  return Object.entries(answers).map(([key, option]) => {
    const questionId = parseInt(key.replace('Q', ''), 10)
    return {
      question_id: questionId,
      selected_option: option,
      score_value: getScoreValue(option),
    }
  })
}

export const useQuestionStep = ({
  testStep,
  setStep,
}: {
  testStep: number
  setStep: Dispatch<SetStateAction<TestType>>
}) => {
  const { isLoggedIn, user } = useLoginStore()
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
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.SELECTED_ANSWERS,
        JSON.stringify(resultData)
      )
      const responseData = convertAnswersToResponseData(resultData)
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.PENDING_RESPONSES,
        JSON.stringify(responseData)
      )
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

  const saveResultToDatabase = async (resultData: AnswerType) => {
    if (!user?.id) {
      return { success: false, error: '사용자 정보가 없습니다.' }
    }

    try {
      const responseData = convertAnswersToResponseData(resultData)
      const { data, error } = await saveUserResponses(user.id, responseData)

      if (error) {
        return { success: false, error: error.message }
      }

      localStorage.removeItem(LOCAL_STORAGE_KEYS.PENDING_RESPONSES)
      return { success: true, data }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류',
      }
    }
  }

  const handleResult = async () => {
    if (isLoggedIn && user?.id) {
      const result = await saveResultToDatabase(answers)
      if (!result.success) {
        saveResultToLocal(answers)
        alert('응답 저장에 실패했습니다. 나중에 다시 시도해주세요.')
      }
    } else {
      saveResultToLocal(answers)
    }
    setStep('result')
  }

  return {
    isClicked,
    handlerAnswer,
    handleResult,
    setIsClicked,
  }
}
