'use client'

import Image from 'next/image'
import { useState } from 'react'

import TestImage from '@/assets/test.png'
import { CardImageProps } from '@/types/card/card'
import { cn } from '@/utils/cn'

import HeartButton from './HeartButton'

const CardImage = ({
  img,
  alt,
  width,
  height,
  initialLiked = false,
  className = '',
  showHeart = false,
}: CardImageProps) => {
  const [liked, setLiked] = useState(initialLiked)

  return (
    <div
      className={cn(
        'relative flex-shrink-0 overflow-hidden rounded-md border border-[#d9d9d9]',
        className
      )}
      style={{ width: width, height: height }}
    >
      <Image
        src={img}
        alt={alt}
        fill
        priority
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.src = TestImage.src
        }}
      />
      {showHeart && (
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
