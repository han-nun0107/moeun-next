'use client'

import { Button, RecommendedModal } from '@/components'
import SelectCartModal from '@/components/common/modal/SelectCartModal'
import { TasteTypeResult, TasteFingerprint } from '@/components/my-page'
import { useRecommendedModal } from '@/hooks/my-page/useRecommendedModal'

const MyPage = () => {
  const {
    isRecommendedModalOpen,
    openRecommendedModal,
    closeRecommendedModal,
    isSelectCartModalOpen,
    openSelectCartModal,
    closeSelectCartModal,
    selectedItems,
    onSelect,
    listData,
    packageData,
  } = useRecommendedModal()

  const handleAddToCart = () => {
    closeRecommendedModal()
    openSelectCartModal()
  }

  return (
    <section className="mr-80 mb-25">
      <div className="flex items-center justify-between border-b-2 border-[#000] pb-5">
        <h1 className="text-[32px] font-bold">마이페이지</h1>
        <Button variant="MY_PAGE_PACKAGE" onClick={openRecommendedModal}>
          나만의 패키지 구성하기
        </Button>
      </div>
      <TasteTypeResult />
      <TasteFingerprint />
      <RecommendedModal
        isOpen={isRecommendedModalOpen}
        onClose={closeRecommendedModal}
        selectedItems={selectedItems}
        onSelect={onSelect}
        listData={listData}
        packageData={packageData}
        onAddToCart={handleAddToCart}
      />
      <SelectCartModal
        isOpen={isSelectCartModalOpen}
        onClose={closeSelectCartModal}
      />
    </section>
  )
}

export default MyPage
