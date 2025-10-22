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
