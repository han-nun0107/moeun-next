import { DetailCardProps } from '@/types/card/card'

import CardImage from './CardImage'

const DetailCard = ({ img, alt }: DetailCardProps) => {
  return (
    <div>
      <CardImage
        img={img}
        alt={alt}
        width={560}
        height={560}
        showHeart={true}
        className="bg-[#f5f5f5]"
      />
    </div>
  )
}

export default DetailCard
