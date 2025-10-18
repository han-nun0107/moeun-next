import { ButtonVariant } from '@/foundations/button'

type TextData = {
  title: string
  content: string
  content2?: string
  content3?: string
}

type ImageData = {
  img: string
  alt: string
  height: number
}

export type CarouselProps = {
  text: TextData
  image: ImageData
  type: 'main' | 'package'
  variant?: ButtonVariant
  btngap?: number
  gap?: number
  className?: string
}
