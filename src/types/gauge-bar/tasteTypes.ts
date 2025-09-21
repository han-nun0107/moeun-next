export type TasteType =
  | 'sweetness_level'
  | 'acidity_level'
  | 'body_level'
  | 'carbonation_level'
  | 'bitterness_level'
  | 'aroma_level'

export type TasteScoreMap = Record<TasteType, number>

export type TasteScore = {
  type: TasteType
  score: number
}
export type TasteMeta = {
  label: string
  color: string
}

export type TasteTestProfile = {
  user: string
  has_test: boolean
  id: number
  prefer_taste: string
  prefer_taste_display: string
  taste_description: string
  image_url: string
  created_at: string
}

export type TestQuestionType = {
  id: string
  question: string
  options: {
    A: string
    B: string
  }
}

export type TestType = 'main' | 'question' | 'result'

export type AnswerType = {
  [key: string]: 'A' | 'B'
}

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
