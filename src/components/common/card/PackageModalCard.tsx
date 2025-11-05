import { PackageModalCardProps } from '@/types/card/card'

import CardImage from './CardImage'

const PackageModalCard = ({
  title,
  alcohol,
  aroma,
  img,
  alt,
}: PackageModalCardProps) => {
  return (
    <div>
      <CardImage img={img} alt={alt} width={189} height={183} />
      <div className="mt-5 gap-8">
        <h3 className="text-bold-lg text-black-200">{title}</h3>
        <h3 className="text-black-200 text-lg">{alcohol}도</h3>
        <h3 className="text-black-200 text-lg">{aroma}향</h3>
      </div>
    </div>
  )
}

export default PackageModalCard
