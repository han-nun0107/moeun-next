import type { SliderVariant } from '@/constants/slider/sliderColors'
import type { TasteScore } from '@/types/gauge-bar/tasteTypes'

type MyPageConstant = {
  GAUGE_VALUES: TasteScore[]
  BUTTON_VALUE: {
    value: string
    label: string
    type: 'CART' | 'CONTINUE'
  }[]
  TASTE_TAGS: {
    label: string
    value: string
  }[]
  TASTE_SLIDER: {
    key: string
    label: string
    variant: SliderVariant
  }[]
  MAX_SELECT_TAGS: number
}

export const MY_PAGE: MyPageConstant = {
  GAUGE_VALUES: [
    { type: 'sweetness_level', score: 4 },
    { type: 'acidity_level', score: 3.5 },
    { type: 'body_level', score: 5 },
    { type: 'carbonation_level', score: 1.5 },
    { type: 'bitterness_level', score: 2 },
    { type: 'aroma_level', score: 3.5 },
  ],
  BUTTON_VALUE: [
    {
      value: '1',
      label: '장바구니 보기',
      type: 'CART',
    },
    {
      value: '2',
      label: '계속 쇼핑하기',
      type: 'CONTINUE',
    },
  ],
  TASTE_TAGS: [
    { label: '#단맛', value: '단맛' },
    { label: '#산미', value: '산미' },
    { label: '#쓴맛', value: '쓴맛' },
    {
      label: '#과일향',
      value: '과일향',
    },
    {
      label: '#꽃향기',
      value: '꽃향기',
    },
    {
      label: '#곡물향',
      value: '곡물향',
    },
    {
      label: '#상큼한',
      value: '상큼한',
    },
    {
      label: '#고소한',
      value: '고소한',
    },
    {
      label: '#부드러운',
      value: '부드러운',
    },
    {
      label: '#톡쏘는',
      value: '톡쏘는',
    },
    {
      label: '#달콤한',
      value: '달콤한',
    },
    {
      label: '#묵직한',
      value: '묵직한',
    },
    {
      label: '#드라이',
      value: '드라이',
    },
    {
      label: '#나무향',
      value: '나무향',
    },
    {
      label: '#누룩향',
      value: '누룩향',
    },
  ] as const,
  TASTE_SLIDER: [
    { key: 'sweetness' as const, label: '단맛', variant: 'sweetness' as const },
    { key: 'acidity' as const, label: '산미', variant: 'acidity' as const },
    { key: 'body' as const, label: '바디감', variant: 'body' as const },
    {
      key: 'carbonation' as const,
      label: '탄산감',
      variant: 'carbonation' as const,
    },
    { key: 'bitter' as const, label: '쓴맛', variant: 'bitter' as const },
    { key: 'aroma' as const, label: '향', variant: 'aroma' as const },
  ] as const,
  MAX_SELECT_TAGS: 3,
}
