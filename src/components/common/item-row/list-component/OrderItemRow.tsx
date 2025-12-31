'use client'

import clsx from 'clsx'
import Image from 'next/image'

import { Button, TasteReviewModal } from '@/components'
import { IMAGE_URLS } from '@/constants/imageUrls'
import { useOrderItemRow } from '@/hooks/item-row/useOrderItemRow'
import { OrderItemRowProps } from '@/types/item-row'

const OrderItemRow = ({
  id,
  img,
  order,
  name,
  quantity,
  price,
  reviewed,
  feedback_id,
  product,
}: OrderItemRowProps) => {
  const {
    handleClick,
    getButtonConfig,
    isModalOpen,
    closeModal,
    totalPrice,
    orderDate,
    getOrderItemId,
  } = useOrderItemRow({
    id,
    reviewed: reviewed ?? false,
    feedback_id,
    productId: product?.id,
    price,
    quantity,
    order,
  })

  const buttonConfig = getButtonConfig()

  return (
    <div className="flex items-center border-b border-gray-100 py-4 text-center text-gray-700">
      <div className="w-[15%] min-w-[80px] text-lg">{orderDate}</div>

      <div className="flex w-[40%] min-w-[250px] items-center gap-4 pl-2">
        <div className="flex-center ml-36 overflow-hidden border">
          <Image
            src={img || IMAGE_URLS.Product.Default}
            alt={name || '상품 이미지'}
            width={100}
            height={100}
            className="h-25 w-25"
            loading="eager"
          />
        </div>
        <p className="text-bold-lg text-left">{name}</p>
      </div>

      <div className="mx-auto w-20 text-lg">{quantity}</div>

      <div className="w-[15%] min-w-[80px] text-lg">
        {totalPrice.toLocaleString()}원
      </div>

      <div className="flex w-[20%] min-w-[100px] justify-center">
        <Button
          onClick={handleClick}
          variant={buttonConfig.variant}
          className={clsx('cursor-pointer text-lg', buttonConfig.className)}
        >
          {buttonConfig.text}
        </Button>
        <TasteReviewModal
          isOpen={isModalOpen}
          onClose={closeModal}
          orderItemId={getOrderItemId()}
        />
      </div>
    </div>
  )
}

export default OrderItemRow
