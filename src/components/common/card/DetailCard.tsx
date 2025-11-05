import { DetailCardProps } from '@/types/card/card'
import { cn } from '@/utils/cn'

import CardImage from './CardImage'

const DetailCard = ({ img, alt, className }: DetailCardProps) => {
  return (
    <div>
      <CardImage
        img={img}
        alt={alt}
        width={560}
        height={560}
        showHeart={true}
        className={cn('bg-gray-25', className)}
      />
    </div>
  )
}

export default DetailCard
