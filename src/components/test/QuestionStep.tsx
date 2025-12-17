'use client'

import { Button } from '@/components'
import { useQuestions, useQuestionStep } from '@/hooks/test'
import { ProgressStepProps, TestQuestionType } from '@/types/test/test'
import { cn } from '@/utils/cn'

const QuestionStep = ({
  step: _step,
  setStep,
  testStep,
  setTestStep,
  testResult: _testResult,
  setTestResult: _setTestResult,
}: ProgressStepProps) => {
  const { questions, isLoading } = useQuestions()
  const { isClicked, handlerAnswer, handleResult, setIsClicked } =
    useQuestionStep({
      testStep,
      setStep,
    })

  if (isLoading) {
    return (
      <div className="flex w-full flex-col items-center justify-center">
        <p className="text-text-26">질문을 불러오는 중...</p>
      </div>
    )
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center">
        <p className="text-text-26">질문을 불러올 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center">
      {questions?.map((question: TestQuestionType, index: number) => {
        if (index !== testStep) return null
        const buttons = [
          {
            condition: index === 0,
            text: '처음으로 돌아가기',
            onclick: () => setStep('main'),
          },
          {
            condition: index > 0 && index < questions.length - 1,
            text: '이전으로 돌아가기',
            onclick: () => setTestStep(testStep - 1),
          },
          {
            condition: index === questions.length - 1,
            text: '결과 확인 하기',
            onclick: handleResult,
          },
        ]
        return (
          <div
            key={question?.id}
            className="mt-19 flex w-full flex-col items-center"
          >
            <p className="text-gray-700">
              {index + 1} / {questions.length}
            </p>
            <p className="text-text-26 mt-19 mb-3.5 font-bold">
              Q{question?.id}.
            </p>
            <p className="text-text-26 mt-3 mb-[60px]">{question?.question}</p>
            <div className="flex flex-col items-center space-y-[14px]">
              {Object.entries(question?.options || {}).map(([key, value]) => (
                <Button
                  key={key}
                  variant="TEST_BUTTON"
                  className={cn(
                    isClicked === key
                      ? 'text-white-100 bg-red-500'
                      : 'bg-white-100 text-red-500'
                  )}
                  onClick={() => {
                    handlerAnswer(key as 'A' | 'B')
                    setIsClicked(key as 'A' | 'B')
                    setTimeout(() => {
                      if (testStep < questions.length - 1) {
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
                    className={`text-white-100 mt-[168px] mb-[57px] ${
                      btn.text === '결과 확인 하기' && !isClicked
                        ? 'cursor-not-allowed'
                        : 'bg-gray-900'
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
