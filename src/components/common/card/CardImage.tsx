'use client'

import Image from 'next/image'
import { useState } from 'react'

import TestImage from '@/assets/test.png'
import { IMAGE_URLS } from '@/constants/imageUrls'
import { CardImageProps } from '@/types/card/card'
import { cn } from '@/utils/cn'
import { isValidUrl } from '@/utils/isValidUrl'

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
  const imageSrc = isValidUrl(img as string)
    ? img
    : (IMAGE_URLS.Product.Default as string)

  return (
    <div
      className={cn(
        'relative flex-shrink-0 overflow-hidden rounded-md border border-gray-300',
        className
      )}
      style={{ width: width, height: height }}
    >
      <Image
        src={imageSrc}
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
