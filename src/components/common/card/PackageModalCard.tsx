import TestImage from '@/assets/test.png'

import CardImage from './CardImage'

type PackageModalCardProps = {
  title: string
  alcohol: string
  aroma: string
}

const PackageModalCard = ({ title, alcohol, aroma }: PackageModalCardProps) => {
  return (
    <div>
      <CardImage src={TestImage} alt="짱구" width={189} height={183} />
      <div className="mt-5 gap-8">
        <h3 className="text-lg font-bold text-[#333]">{title}</h3>
        <h3 className="text-lg text-[#333]">{alcohol}도</h3>
        <h3 className="text-lg text-[#333]">{aroma}향</h3>
      </div>
    </div>
  )
}

export default PackageModalCard
