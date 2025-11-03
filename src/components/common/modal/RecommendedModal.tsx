'use client'

import { Button, Modal, RecommendedCard } from '@/components'
import { RECOMMENDED } from '@/mocks/modal/recommended'

type RecommendedItem = (typeof RECOMMENDED)[number]

type RecommendedModalProps = {
  isOpen: boolean
  onClose: () => void
  selectedItems: RecommendedItem[]
  onSelect: (id: number) => void
  listData: RecommendedItem[]
  packageData: RecommendedItem[]
  onAddToCart: () => void
}

const RecommendedModal = ({
  isOpen,
  onClose,
  selectedItems,
  onSelect,
  listData,
  packageData,
  onAddToCart,
}: RecommendedModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="review-modal-scroll h-225 w-full overflow-auto"
    >
      <article>
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <h1 className="text-black-200 w-80 text-[32px] font-bold">
            김오즈님 취향에 어울리는 전통주를 추천해 드려요
          </h1>
          <p className="text-black-200 text-lg">
            깔끔한 단맛과 적당한 도수를 선호하는 당신에게 어울리는
          </p>
        </div>
        <article>
          <h3 className="border-black-100 text-black-200 mt-11 w-full border-b-2 pb-3 text-[20px] font-bold">
            추천 리스트
          </h3>
          <div className="mt-7 grid grid-cols-3 gap-4">
            {listData.map((item) => (
              <RecommendedCard
                key={item.id}
                id={item.id}
                img={item.img}
                alt={item.alt}
                title={item.title}
                alcohol={item.alcohol}
                smell={item.smell}
                type="list"
                isSelected={selectedItems.some(
                  (selected) => selected.id === item.id
                )}
                onSelect={onSelect}
              />
            ))}
          </div>
        </article>
        <article>
          <h3 className="border-black-100 text-black-200 mt-11 w-full border-b-2 pb-3 text-[20px] font-bold">
            패키지 리스트
          </h3>
          <div className="mt-7 mb-25 grid grid-cols-3 gap-4">
            {packageData.map((item) => (
              <RecommendedCard
                key={item.id}
                id={item.id}
                img={item.img}
                alt={item.alt}
                title={item.title}
                type="package"
                isSelected={selectedItems.some(
                  (selected) => selected.id === item.id
                )}
                onSelect={onSelect}
              />
            ))}
          </div>
        </article>
        <Button variant="RECOMMENDED_BUY" onClick={onAddToCart}>
          장바구니에 담기
        </Button>
      </article>
    </Modal>
  )
}

export default RecommendedModal
