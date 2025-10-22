// src/app/(with-layout)/test/TestClient.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'

import Logo from '@/assets/icons/logo/logo-white.svg'
import { MainStep, QuestionStep, ResultStep } from '@/components/test'
import { IMAGE_URLS } from '@/constants'
import { TasteTestResult, TestType } from '@/types/test/test'
import { cn } from '@/utils/cn'

const TestClient = () => {
  const [step, setStep] = useState<TestType>('main')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [testStep, setTestStep] = useState(0)
  const [testResult, setTestResult] = useState<TasteTestResult | undefined>(
    undefined
  )

  return (
    <section
      className={cn(
        'flex h-[1130px] w-full items-center justify-center bg-[#f2f2f2]',
        step === 'result' ? 'h-[1620px]' : 'h-[1130px]'
      )}
    >
      <div
        className={cn(
          'flex w-140 flex-col rounded-2xl',
          step === 'result' ? 'h-[1454px]' : 'h-[872px]'
        )}
      >
        <div className="flex h-[70px] w-full items-center justify-center rounded-t-[20px] bg-[#f2544b]">
          <Link href="/">
            <img src={Logo.src} alt="로고" className="h-6 w-13" />
          </Link>
        </div>
        <div
          className="flex h-full flex-col items-center gap-12 rounded-b-[20px]"
          style={{
            backgroundImage: `url(${
              step === 'result'
                ? IMAGE_URLS.Test.ResultBG
                : IMAGE_URLS.Test.Background
            })`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {step === 'main' && (
            <MainStep
              setStep={setStep}
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
      </div>
    </section>
  )
}

export default TestClient
