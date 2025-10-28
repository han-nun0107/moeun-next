export const VARIANT_COLOR_MAP = {
  sweetness: '#F2544B',
  acidity: '#99B278',
  body: '#3C72B4',
  trust: '#000000',
  carbonation: '#6C4A5D',
  bitter: '#A17950',
  aroma: '#95AD75',
} as const

export const SLIDER_OPTIONS = [
  { key: 'sweetness', label: '단맛' },
  { key: 'body', label: '바디감' },
  { key: 'acidity', label: '산미' },
  { key: 'carbonation', label: '탄산감' },
  { key: 'bitter', label: '쓴맛' },
  { key: 'aroma', label: '향' },
] as const

export const SEARCH_CHECKBOX = [
  {
    id: 'search-checkbox-1',
    label: '선물용',
  },
  {
    id: 'search-checkbox-2',
    label: '지역 특산주',
  },
  {
    id: 'search-checkbox-3',
    label: '주류 대상 수상',
  },
  {
    id: 'search-checkbox-4',
    label: '리미티드 에디션',
  },
]

export type SliderVariant = keyof typeof VARIANT_COLOR_MAP
