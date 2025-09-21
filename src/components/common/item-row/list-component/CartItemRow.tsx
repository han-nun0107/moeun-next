'use client'

import Image from 'next/image'
import Link from 'next/link'

import { IMAGE_URLS } from '@/constants/imageUrls'
import useCartItem from '@/hooks/item-row/useCartItem'
import { CartItemRowProps } from '@/types/item-row'

import { QuantityInput } from './QuantityInput'

const CartItemRow = ({
  id,
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
  const { localQuantity, onIncreaseQuantity, onDecreaseQuantity } = useCartItem(
    {
      quantity: quantity || 0,
      id,
      onQuantityChange,
    }
  )

  return (
    <div className="flex items-center border-b border-[#e1e1e1] py-5 text-center text-[#333333]">
      <div className="flex w-[40%] min-w-[250px] items-center gap-12">
        <input
          type="checkbox"
          checked={checked || false}
          onChange={(e) => onCheckChange?.(e.target.checked)}
          className="ml-12 h-5 w-5 accent-[#f2544b]"
        />
        <Link href={`/product/${detailId}`}>
          <Image
            src={img || IMAGE_URLS.Product.Default}
            alt={name || '상품 이름'}
            width={100}
            height={100}
            className="h-25 w-25 rounded border border-[#d9d9d9]"
          />
        </Link>
        <p className="text-left text-lg font-bold">{name || '상품 이름'}</p>
      </div>

      {/* 수량 조절 */}
      <div className="mx-auto inline-flex h-8 w-20 items-center justify-center gap-1 rounded-[5px] bg-[#f6f6f6]">
        <QuantityInput
          value={localQuantity}
          onIncrease={onIncreaseQuantity}
          onDecrease={onDecreaseQuantity}
        />
      </div>
      <div className="w-[15%] min-w-[80px] font-medium">
        {parseInt(String(price ?? '0'), 10).toLocaleString()}원
      </div>

      <div className="w-[25%] min-w-[150px] text-[#666666]">
        <p className="mb-2 text-lg text-[#333333] underline">{pickupName}</p>
        <p className="text-sm">{pickupAddress}</p>
        <p className="text-sm">{pickupContact}</p>
      </div>
    </div>
  )
}

export default CartItemRow
