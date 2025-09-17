import TestImage from '@/assets/test.png'
import Tag from '@/components/common/Tag'

import CardImage from './CardImage'

const testTags = ['부드러운', '곡물향']

type TestCardProps = {
  title: string
  subtitle: string
}

const TestCard = ({ title, subtitle }: TestCardProps) => {
  return (
    <div>
      <CardImage
        src={TestImage}
        alt="짱구"
        width={132}
        height={128}
        className="bg-[#fff]"
      />
      <h3 className="mt-2 text-sm font-bold text-[#333]">{title}</h3>
      <p className="mt-2 text-xs font-bold text-[#666]">{subtitle}</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {testTags.map((tag) => (
          <Tag key={tag} tagName={tag} />
        ))}
      </div>
    </div>
  )
}

export default TestCard
