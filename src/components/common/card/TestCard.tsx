import { StaticImageData } from 'next/image'

import Tag from '@/components/common/Tag'

import CardImage from './CardImage'

type TestCardProps = {
  name: string
  description: string
  img: string | StaticImageData
  alt: string
  tags: string[]
}

const TestCard = ({ name, description, img, alt, tags }: TestCardProps) => {
  return (
    <>
      <div>
        <CardImage
          src={img}
          alt={alt}
          width={132}
          height={128}
          className="bg-[#fff]"
        />
        <h3 className="mt-2 text-sm font-bold text-[#333]">{name}</h3>
        <p className="mt-2 text-xs font-bold text-[#666]">{description}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Tag key={tag} tagName={tag} />
          ))}
        </div>
      </div>
    </>
  )
}

export default TestCard
