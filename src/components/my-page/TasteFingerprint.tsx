'use client'

import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'

import { Button, GaugeBar } from '@/components'
import { TasteScore } from '@/types/gauge-bar/tasteTypes'

const TasteFingerprint = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const GAUGE_VALUES: TasteScore[] = [
    { type: 'sweetness_level', score: 4 },
    { type: 'acidity_level', score: 3.5 },
    { type: 'body_level', score: 5 },
    { type: 'carbonation_level', score: 1.5 },
    { type: 'bitterness_level', score: 2 },
    { type: 'aroma_level', score: 3.5 },
  ]

  const displayedGauges = isExpanded ? GAUGE_VALUES : GAUGE_VALUES.slice(0, 3)

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev)
  }

  return (
    <article className="relative mt-10">
      <p className="text-bold-lg flex-center circle-border absolute z-10 mt-5 ml-5 h-10 w-35 border-[#333] text-[#333]">
        나의 맛의 지문
      </p>
      <div className="flex-center h-auto min-h-[370px] w-315 bg-[#f2f2f2] pt-5">
        <div className="flex-center h-full gap-1 py-10">
          <div className="flex-center flex-col border-r border-[#d9d9d9] pr-16">
            {displayedGauges.map((gauge) => (
              <GaugeBar
                key={gauge.type}
                type={gauge.type}
                score={gauge.score}
              />
            ))}
            <Button
              variant="EXPAND"
              aria-label={isExpanded ? '맛의 지문 접기' : '맛의 지문 펼치기'}
              className="flex-center"
              onClick={toggleExpand}
            >
              {isExpanded ? '접어보기' : '펼쳐보기'}
              <span
                className={`flex-center ml-[10px] h-4 w-4 rounded-full bg-[#000] transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              >
                <ChevronDownIcon size={16} className="text-white" />
              </span>
            </Button>
          </div>
          <div className="ml-25 flex max-w-96 flex-col">
            <h3 className="text-bold-lg text-[#333]">나의 지문 요약</h3>
            <p className="text-base leading-relaxed text-[#333]">
              최근 피드백을 보니 다른 분들에 비해 단맛에는 조금 둔감하고,
              산미에는 더 민감하게 반응하는 섬세한 입맛을 가지고 계세요!
            </p>
            <p className="mt-9 text-base leading-relaxed text-[#333]">
              이런 분들께는 과실의 산미가 매력적인 약주가 잘 어울릴 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default TasteFingerprint
