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
  product_id?: string
  onClick?: () => void
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
  price: number | string
}

export type PackageModalCardProps = DetailCardProps & {
  title: string
  alcohol: string
  aroma: string
}
