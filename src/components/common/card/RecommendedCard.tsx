import { Minus, Plus } from 'lucide-react'

import { Button } from '@/components'
import { cn } from '@/utils/cn'

import CardImage from './CardImage'

type RecommendedCardProps = {
  id: number
  img: string
  alt: string
  title: string
  alcohol?: string
  smell?: string
  type: 'list' | 'package'
  isSelected: boolean
  onSelect: (id: number) => void
}

const RecommendedCard = ({
  id,
  img,
  alt,
  title,
  alcohol,
  smell,
  type,
  isSelected,
  onSelect,
}: RecommendedCardProps) => {
  return (
    <article className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <CardImage img={img} alt={alt} width={188} height={182} />
        <div className="flex flex-col gap-1">
          <h3 className="text-bold-lg">{title}</h3>
          {type === 'list' && (
            <>
              <p className="text-black-200 text-lg">{alcohol}</p>
              <p className="text-black-200 text-lg">{smell}</p>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button
          variant="RECOMMENDED"
          onClick={() => onSelect(id)}
          className={cn(isSelected && 'bg-[#000] text-[#fff]')}
        >
          {isSelected ? <Minus size={40} /> : <Plus size={40} />}
        </Button>
      </div>
    </article>
  )
}

export default RecommendedCard
