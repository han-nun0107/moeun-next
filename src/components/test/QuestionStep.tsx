'use client'

import { useState } from 'react'

import Button from '@/components/common/Button'
import { mockTasteTestData } from '@/mocks/test/questions'
import { TasteTestResult, TestQuestionType, TestType } from '@/types/test/test'
import { cn } from '@/utils/cn'

export type ProgressStepProps = {
  step: TestType
  setStep: React.Dispatch<React.SetStateAction<TestType>>
  testStep: number
  setTestStep: React.Dispatch<React.SetStateAction<number>>
  testResult: TasteTestResult | undefined
  setTestResult: React.Dispatch<
    React.SetStateAction<TasteTestResult | undefined>
  >
}

type AnswerType = {
  [key: string]: 'A' | 'B'
}

const QuestionStep = ({
  step: _step,
  setStep,
  testStep,
  setTestStep,
  testResult: _testResult,
  setTestResult: _setTestResult,
}: ProgressStepProps) => {
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
    } catch {
      alert('저장에 실패 했습니다!')
    }
  }

  const handleResult = () => {
    saveResultToLocal(answers)
    setStep('result')
  }

  return (
    <div className="flex w-full flex-col items-center">
      {mockTasteTestData?.map((question: TestQuestionType, index: number) => {
        if (index !== testStep) return null
        const buttons = [
          {
            condition: index === 0,
            text: '처음으로 돌아가기',
            onclick: () => setStep('main'),
          },
          {
            condition: index > 0 && index < mockTasteTestData.length - 1,
            text: '이전으로 돌아가기',
            onclick: () => setTestStep(testStep - 1),
          },
          {
            condition: index === mockTasteTestData.length - 1,
            text: '결과 확인 하기',
            onclick: handleResult,
          },
        ]
        return (
          <div
            key={question?.id}
            className="mt-19 flex w-full flex-col items-center"
          >
            <p className="text-[#666666]">
              {index + 1} / {mockTasteTestData.length}
            </p>
            <p className="mt-19 mb-3.5 text-[26px] font-bold">
              Q{question?.id}.
            </p>
            <p className="mt-3 mb-[60px] text-[26px]">{question?.question}</p>
            <div className="flex flex-col items-center space-y-[14px]">
              {Object.entries(question?.options || {}).map(([key, value]) => (
                <Button
                  key={key}
                  variant="TEST_BUTTON"
                  className={cn(
                    isClicked === key
                      ? 'bg-[#F2544B] text-[#FFFFFF]'
                      : 'bg-[#FFFFFF] text-[#F2544B]'
                  )}
                  onClick={() => {
                    handlerAnswer(key as 'A' | 'B')
                    setIsClicked(key as 'A' | 'B')
                    setTimeout(() => {
                      if (testStep < mockTasteTestData.length - 1) {
                        setTestStep(testStep + 1)
                      }
                    }, 100)
                  }}
                >
                  {key}. {value}
                </Button>
              ))}
            </div>

            {buttons.map(
              (btn, index) =>
                btn.condition && (
                  <Button
                    key={index}
                    variant="TEST"
                    className={`mt-[168px] mb-[57px] text-[#FFFFFF] ${
                      btn.text === '결과 확인 하기' && !isClicked
                        ? 'cursor-not-allowed'
                        : 'bg-[#2E2F2F]'
                    }`}
                    onClick={btn.onclick}
                    disabled={btn.text === '결과 확인 하기' && !isClicked}
                  >
                    {btn.text}
                  </Button>
                )
            )}
          </div>
        )
      })}
    </div>
  )
}

export default QuestionStep
