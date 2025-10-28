import type {
  SLIDER_OPTIONS,
  SliderVariant,
} from '@/constants/slider/sliderColors'

export type SliderProps = {
  defaultValue?: number[]
  max?: number
  step?: number
  label?: string
  variant: SliderVariant
  className?: string
  value: number[]
  onValueChange: (value: number[]) => void
  formatValue?: (value: number) => string
}

export type SliderVariantType = (typeof SLIDER_OPTIONS)[number]['key']
