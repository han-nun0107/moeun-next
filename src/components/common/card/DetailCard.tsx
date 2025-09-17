import { StaticImageData } from 'next/image'

import CardImage from './CardImage'

type DetailCardProps = {
  img: string | StaticImageData
  alt: string
}

const DetailCard = ({ img, alt }: DetailCardProps) => {
  return (
    <div>
      <CardImage
        src={img}
        alt={alt}
        width={560}
        height={560}
        isLiked={true}
        className="bg-[#f5f5f5]"
      />
    </div>
  )
}

export default DetailCard
