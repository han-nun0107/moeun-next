'use client'

import DetailFeedback from '@/components/detail/DetailFeedback'
import DetailInformation from '@/components/detail/DetailInformation'
import DetailProduct from '@/components/detail/DetailProduct'
import { useDetailPage } from '@/hooks/detail/useDetailPage'
import { detailMock } from '@/mocks/detail/detailMock'

const Detail = () => {
  const {
    dropdownValues,
    handleDropdownChange,
    localQuantity,
    onIncreaseQuantity,
    onDecreaseQuantity,
    handleAddToCart,
    handlePurchase,
  } = useDetailPage()

  return (
    <div className="mx-auto mt-25 flex max-w-320 flex-col gap-25">
      <DetailProduct
        data={detailMock}
        quantity={localQuantity}
        onIncreaseQuantity={onIncreaseQuantity}
        onDecreaseQuantity={onDecreaseQuantity}
        dropdownValues={dropdownValues}
        handleDropdownChange={handleDropdownChange}
        onAddCart={handleAddToCart}
        onPurchase={handlePurchase}
      />

      <DetailInformation data={detailMock} />

      <div>
        <div className="text-bold-lg border-b-2 pb-5">구매 및 수령 방식</div>
        <div className="mt-[35px] h-40 w-313 bg-gray-50">
          <span className="flex-center h-full font-semibold">
            수도권 픽업 가능한 상품입니다.
          </span>
        </div>
      </div>

      <DetailFeedback />
    </div>
  )
}

export default Detail
