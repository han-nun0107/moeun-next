import { StaticImageData } from 'next/image'

import CardImage from './CardImage'

type ProductCardProps = {
  title: string
  subtitle: string
  price: string
  img: string | StaticImageData
  alt: string
}

const ProductCard = ({
  title,
  subtitle,
  price,
  img,
  alt,
}: ProductCardProps) => {
  return (
    <div className="flex flex-col gap-1">
      <CardImage
        src={img}
        alt={alt}
        width={300}
        height={290}
        showHeart={true}
      />
      <h3 className="mt-4 text-left text-lg font-bold text-[#333]">{title}</h3>
      <p className="text-left text-base text-[#666]">{subtitle}</p>
      <p className="text-left text-base font-bold text-[#333]">{price}</p>
    </div>
  )
}

export default ProductCard
