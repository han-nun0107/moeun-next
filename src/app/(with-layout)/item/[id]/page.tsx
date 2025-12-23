'use client'

import { use } from 'react'

import { Button } from '@/components'
import {
  DetailFeedback,
  DetailInformation,
  DetailProduct,
} from '@/components/detail'
import { useDetailPage } from '@/hooks/detail/useDetailPage'
import { useProductDetail } from '@/hooks/product/useProductDetail'

type DetailPageProps = {
  params: Promise<{
    id: string
  }>
}

const Detail = ({ params }: DetailPageProps) => {
  const { id } = use(params)
  const { product, isLoading, isError, error, refetch } = useProductDetail(id)

  const {
    dropdownValues,
    handleDropdownChange,
    localQuantity,
    onIncreaseQuantity,
    onDecreaseQuantity,
    handleAddToCart,
    handlePurchase,
  } = useDetailPage()

  if (isLoading) {
    return (
      <div className="mx-auto mt-25 flex max-w-320 flex-col items-center justify-center gap-25 py-50">
        <div className="text-lg text-gray-600">상품 정보를 불러오는 중...</div>
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className="mx-auto mt-25 flex max-w-320 flex-col items-center justify-center gap-25 py-50">
        <div className="text-lg font-semibold text-red-500">
          {error?.message || '상품 정보를 불러올 수 없습니다.'}
        </div>
        <Button onClick={() => refetch()} variant="CONTAINED" className="mt-4">
          다시 시도
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto mt-25 flex max-w-320 flex-col gap-25">
      <DetailProduct
        data={product}
        quantity={localQuantity}
        onIncreaseQuantity={onIncreaseQuantity}
        onDecreaseQuantity={onDecreaseQuantity}
        dropdownValues={dropdownValues}
        handleDropdownChange={handleDropdownChange}
        onAddCart={handleAddToCart}
        onPurchase={handlePurchase}
      />

      <DetailInformation data={product} />

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
