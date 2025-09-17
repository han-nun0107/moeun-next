import TestImage from '@/assets/test.png'

import CardImage from './CardImage'

type ProductCardProps = {
  title: string
  subtitle: string
  price: string
}

const ProductCard = ({ title, subtitle, price }: ProductCardProps) => {
  return (
    <div className="flex flex-col gap-1">
      <CardImage
        src={TestImage}
        alt="짱구"
        width={300}
        height={290}
        Heart={true}
      />
      <h3 className="mt-4 text-left text-lg font-bold text-[#333]">{title}</h3>
      <p className="text-left text-base text-[#666]">{subtitle}</p>
      <p className="text-left text-base font-bold text-[#333]">{price}</p>
    </div>
  )
}

export default ProductCard
