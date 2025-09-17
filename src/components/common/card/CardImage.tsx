'use client'

import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'

import TestImage from '@/assets/test.png'
import { cn } from '@/utils/cn'
import isValidUrl from '@/utils/validUrl'

import HeartButton from './HeartButton'

type CardImageProps = {
  src?: string | StaticImageData | null
  alt: string
  width: number
  height: number
  isLiked?: boolean
  className?: string
}

const CardImage = ({
  src,
  alt,
  width,
  height,
  isLiked = false,
  className = '',
}: CardImageProps) => {
  const [liked, setLiked] = useState(false)

  return (
    <div
      className={cn(
        'relative flex-shrink-0 overflow-hidden rounded-md border border-[#d9d9d9]',
        className
      )}
      style={{ width: width, height: height }}
    >
      <Image
        src={typeof src === 'string' && isValidUrl(src) ? src : TestImage}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.src = TestImage.src
        }}
      />
      {isLiked && (
        <HeartButton
          isLiked={liked}
          onClick={() => setLiked(!liked)}
          className="absolute right-2 bottom-2 z-10"
        />
      )}
    </div>
  )
}

export default CardImage
