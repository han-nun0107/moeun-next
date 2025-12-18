'use client'

import { ChevronDownIcon } from 'lucide-react'

import questionMark from '@/assets/icons/my-page/my-question.svg'
import { Button, GaugeBar } from '@/components'
import { useGauge } from '@/hooks/my-page'
import { cn } from '@/utils/cn'

const TasteFingerprint = () => {
  const { isExpanded, displayedGauges, toggleExpand } = useGauge()

  return (
    <article className="relative mt-10">
      <p className="text-bold-lg flex-center circle-border border-black-200 text-black-200 absolute z-10 mt-5 ml-5 h-10 w-35">
        나의 맛의 지문
      </p>
      <div className="flex-center h-auto min-h-[370px] w-315 bg-gray-50 pt-5">
        <div className="flex-center h-full gap-1 py-10">
          <div className="flex-center flex-col border-r border-gray-300 pr-16">
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
                className={cn(
                  'flex-center bg-black-100 ml-[10px] h-4 w-4 rounded-full transition-transform',
                  {
                    'rotate-180': isExpanded,
                  }
                )}
              >
                <ChevronDownIcon size={16} className="text-white-100" />
              </span>
            </Button>
          </div>
          <div className="ml-25 flex max-w-96 flex-col">
            <div className="flex items-center">
              <h3 className="text-bold-lg text-black-200">
                <span className="mr-3 mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
                  <img
                    src={questionMark.src}
                    alt="지문 요약 아이콘"
                    className="inline h-5 w-6"
                  />
                </span>
                나의 지문 요약
              </h3>
            </div>
            <p className="text-black-200 text-base leading-relaxed">
              최근 피드백을 보니 다른 분들에 비해 단맛에는 조금 둔감하고,
              산미에는 더 민감하게 반응하는 섬세한 입맛을 가지고 계세요!
            </p>
            <p className="text-black-200 mt-9 text-base leading-relaxed">
              이런 분들께는 과실의 산미가 매력적인 약주가 잘 어울릴 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default TasteFingerprint
