import { StaticImageData } from 'next/image'

import CardImage from './CardImage'

type PackageModalCardProps = {
  title: string
  alcohol: string
  aroma: string
  img: string | StaticImageData
  alt: string
}

const PackageModalCard = ({
  title,
  alcohol,
  aroma,
  img,
  alt,
}: PackageModalCardProps) => {
  return (
    <div>
      <CardImage src={img} alt={alt} width={189} height={183} />
      <div className="mt-5 gap-8">
        <h3 className="text-lg font-bold text-[#333]">{title}</h3>
        <h3 className="text-lg text-[#333]">{alcohol}도</h3>
        <h3 className="text-lg text-[#333]">{aroma}향</h3>
      </div>
    </div>
  )
}

export default PackageModalCard
