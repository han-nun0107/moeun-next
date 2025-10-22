import { Dispatch, SetStateAction } from 'react'

export type TestType = 'main' | 'question' | 'result'

export type TasteTestResult = {
  type: string
  scores: {
    [key: string]: number
  }
  info: {
    name: string
    enum: string
    description: string
    characteristics: string[]
    image_url: string
  }
  saved: boolean
}

export type TestQuestionType = {
  id: number
  question: string
  options: {
    A: string
    B: string
  }
}

export type MainTestProps = {
  setStep: Dispatch<SetStateAction<TestType>>
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  isModalOpen: boolean
}

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

export type AnswerType = {
  [key: string]: 'A' | 'B'
}
