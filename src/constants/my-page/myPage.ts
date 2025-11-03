import type { TasteScore } from '@/types/gauge-bar/tasteTypes'

interface MyPageConstant {
  GAUGE_VALUES: TasteScore[]
  BUTTON_VALUE: {
    value: string
    label: string
    type: 'CART' | 'CONTINUE'
  }[]
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
}
