import { useState } from 'react'

import { TasteTestResult, TestType } from '@/types/test/test'

export const useTasteTest = () => {
  const [step, setStep] = useState<TestType>('main')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [testStep, setTestStep] = useState(0)
  const [testResult, setTestResult] = useState<TasteTestResult | undefined>()

  const nextStep = () => {
    if (step === 'main') setStep('question')
    else if (step === 'question') setStep('result')
  }

  const resetTest = () => {
    setStep('main')
    setTestStep(0)
    setTestResult(undefined)
    setIsModalOpen(false)
  }

  return {
    step,
    setStep,
    isModalOpen,
    setIsModalOpen,
    testStep,
    setTestStep,
    testResult,
    setTestResult,
    nextStep,
    resetTest,
  }
}
