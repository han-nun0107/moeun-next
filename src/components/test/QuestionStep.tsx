'use client'

import Button from '@/components/common/Button'
import { useQuestionStep } from '@/hooks/test/useQuestionStep'
import { mockTasteTestData } from '@/mocks/test/questions'
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
  const { isClicked, handlerAnswer, handleResult, setIsClicked } =
    useQuestionStep({
      testStep,
      setStep,
    })

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
