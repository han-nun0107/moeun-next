'use client'

import Image from 'next/image'
import Link from 'next/link'

import { IMAGE_URLS } from '@/constants/imageUrls'
import { CartItemRowProps } from '@/types/item-row'

import QuantityInput from './QuantityInput'

const CartItemRow = ({
  detailId,
  img,
  name,
  quantity,
  price,
  pickupName,
  pickupAddress,
  pickupContact,
  onCheckChange,
  checked,
  onQuantityChange,
}: CartItemRowProps) => {
  const handleIncrease = () => {
    onQuantityChange?.((quantity || 0) + 1)
  }

  const handleDecrease = () => {
    if ((quantity || 0) <= 1) return
    onQuantityChange?.((quantity || 0) - 1)
  }

  return (
    <div className="text-black-200 flex items-center border-b border-gray-100 py-5 text-center">
      <div className="flex w-[40%] min-w-[250px] items-center gap-12">
        <input
          type="checkbox"
          checked={checked || false}
          onChange={(e) => onCheckChange?.(e.target.checked)}
          className="ml-12 h-5 w-5 accent-red-500"
        />
        <Link href={`/item/${detailId}`}>
          <Image
            src={img || IMAGE_URLS.Product.Default}
            alt={name || '상품 이름'}
            width={100}
            height={100}
            className="h-25 w-25 rounded border border-gray-300"
          />
        </Link>
        <p className="text-bold-lg text-left">{name || '상품 이름'}</p>
      </div>

      {/* 수량 조절 */}
      <div className="bg-gray-10 mx-auto inline-flex h-8 w-20 items-center justify-center gap-1 rounded-[5px]">
        <QuantityInput
          value={quantity || 0}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
      </div>
      <div className="w-[15%] min-w-[80px] font-medium">
        {parseInt(String(price ?? '0'), 10).toLocaleString()}원
      </div>

      <div className="w-[25%] min-w-[150px] text-gray-700">
        <p className="text-black-200 mb-2 text-lg underline">{pickupName}</p>
        <p className="text-sm">{pickupAddress}</p>
        <p className="text-sm">{pickupContact}</p>
      </div>
    </div>
  )
}

export default CartItemRow
