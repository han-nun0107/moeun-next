import Tag from '@/components/common/Tag'
import { TestCardProps } from '@/types/card/card'

import CardImage from './CardImage'

const TestCard = ({ name, description, img, alt, tags }: TestCardProps) => {
  return (
    <>
      <div>
        <CardImage
          img={img}
          alt={alt}
          width={132}
          height={128}
          className="bg-white-100"
        />
        <h3 className="text-black-200 mt-2 text-sm font-bold">{name}</h3>
        <p className="mt-2 text-xs font-bold text-gray-700">{description}</p>
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
