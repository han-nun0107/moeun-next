import { ProductCardProps } from '@/types/card/card'

import CardImage from './CardImage'

const ProductCard = ({
  title,
  subtitle,
  price,
  img,
  alt,
}: ProductCardProps) => {
  return (
    <div className="flex cursor-pointer flex-col gap-1">
      <CardImage
        img={img}
        alt={alt}
        width={300}
        height={290}
        showHeart={true}
      />
      <h3 className="text-bold-lg text-black-200 mt-4 text-left">{title}</h3>
      <p className="text-left text-base text-gray-700">{subtitle}</p>
      <p className="text-black-200 text-left text-base font-bold">{price}</p>
    </div>
  )
}

export default ProductCard
