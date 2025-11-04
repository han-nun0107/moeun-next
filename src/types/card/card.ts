import { StaticImageData } from 'next/image'

export type DetailCardProps = {
  img: string | StaticImageData
  alt: string
  className?: string
}

export type ReviewCardProps = DetailCardProps & {
  rating: number
  feedback: string
  nickname: string
  createdAt?: string
  text?: string
}

export type CardImageProps = DetailCardProps & {
  width: number
  height: number
  initialLiked?: boolean
  className?: string
  showHeart?: boolean
}

export type TestCardProps = DetailCardProps & {
  name: string
  description: string
  tags: string[]
}

export type ProductCardProps = DetailCardProps & {
  title: string
  subtitle: string
  price: string
}

export type PackageModalCardProps = DetailCardProps & {
  title: string
  alcohol: string
  aroma: string
}
