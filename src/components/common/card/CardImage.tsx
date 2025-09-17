'use client'

import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'

import { cn } from '@/utils/cn'

import HeartButton from './HeartButton'

type CardImageProps = {
  src: string | StaticImageData
  alt: string
  width: number
  height: number
  Heart?: boolean
  className?: string
}

const CardImage = ({
  src,
  alt,
  width,
  height,
  Heart = false,
  className = '',
}: CardImageProps) => {
  const [isLiked, setIsLiked] = useState(false)

  if (!src) return null

  return (
    <div
      className={cn(
        'relative flex-shrink-0 overflow-hidden rounded-md border border-[#d9d9d9]',
        className
      )}
      style={{ width: width, height: height }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 300px"
      />
      {Heart && (
        <HeartButton
          isLiked={isLiked}
          onClick={() => setIsLiked(!isLiked)}
          className="absolute right-2 bottom-2 z-10"
        />
      )}
    </div>
  )
}

export default CardImage
