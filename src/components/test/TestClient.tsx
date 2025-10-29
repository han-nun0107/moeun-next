'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

import Logo from '@/assets/icons/logo/logo-white.svg'
import { Button } from '@/components'
import { IMAGE_URLS } from '@/constants'
import { useTasteTest } from '@/hooks/test/useTestClient'
import { TEST_BOTTOM_BUTTON } from '@/mocks/test/resultProduct'
import { cn } from '@/utils/cn'

const MainStep = dynamic(() => import('@/components/test/MainStep'))
const QuestionStep = dynamic(() => import('@/components/test/QuestionStep'))
const ResultStep = dynamic(() => import('@/components/test/ResultStep'))

const TestClient = () => {
  const {
    step,
    isModalOpen,
    setIsModalOpen,
    testStep,
    setTestStep,
    testResult,
    setTestResult,
    setStep,
  } = useTasteTest()

  return (
    <section
      className={cn(
        'flex w-full items-center justify-center bg-[#f2f2f2]',
        step === 'result' ? 'h-[1620px]' : 'h-[1130px]'
      )}
    >
      <div
        className={cn(
          'flex w-140 flex-col rounded-2xl',
          step === 'result' ? 'h-[1454px]' : 'h-[872px]'
        )}
      >
        <div className="flex h-[70px] items-center justify-center rounded-t-[20px] bg-[#f2544b]">
          <Link href="/">
            <img src={Logo.src} alt="로고" className="h-6 w-13" />
          </Link>
        </div>

        <div
          className="flex flex-1 flex-col items-center gap-12"
          style={{
            backgroundImage: `url(${
              step === 'result'
                ? IMAGE_URLS.Test.ResultBG
                : IMAGE_URLS.Test.Background
            })`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderBottomLeftRadius: step === 'result' ? '0' : '20px',
            borderBottomRightRadius: step === 'result' ? '0' : '20px',
          }}
        >
          {step === 'main' && (
            <MainStep
              setStep={() => setStep('question')}
              setIsModalOpen={setIsModalOpen}
              isModalOpen={isModalOpen}
            />
          )}
          {step === 'question' && (
            <QuestionStep
              step={step}
              setStep={setStep}
              testStep={testStep}
              setTestStep={setTestStep}
              testResult={testResult}
              setTestResult={setTestResult}
            />
          )}
          {step === 'result' && <ResultStep />}
        </div>

        {step === 'result' && (
          <div className="flex h-[103px] w-full items-center justify-center gap-[10px] rounded-b-[20px] bg-[#f2544b]">
            {TEST_BOTTOM_BUTTON.map((button) => (
              <Link
                key={button.id}
                href={button.href}
                aria-label={button.label}
              >
                <Button variant="TEST_BOTTOM">{button.label}</Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default TestClient
