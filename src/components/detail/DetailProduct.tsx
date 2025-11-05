'use client'

import { Minus, Plus } from 'lucide-react'

import { StarRating, Dropdown, Card, Button } from '@/components'
import { dropdownOptions } from '@/constants'
import type { ProductDetail } from '@/types/product'
import { cn } from '@/utils/cn'

type DetailProductProps = {
  data: ProductDetail
  quantity: number
  onIncreaseQuantity: () => void
  onDecreaseQuantity: () => void
  isDecreaseDisabled?: boolean
  dropdownValues: Record<string, string>
  handleDropdownChange: (key: string, value: string) => void
  onAddCart: () => void
  onPurchase: () => void
}

const DetailProduct = ({
  data,
  quantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
  dropdownValues: _dropdownValues,
  handleDropdownChange,
  onAddCart,
  onPurchase,
}: DetailProductProps) => {
  return (
    <div className="grid grid-cols-2 gap-8">
      <Card
        type="detail"
        data={{
          img: data.main_image_url ?? data.images[0]?.image_url ?? '',
          alt: data.name,
          className:
            'h-50 w-50 sm:h-100 sm:w-100 md:h-100 md:w-100 lg:h-140 lg:w-140',
        }}
      />

      <div className="space-y-4">
        <div className="grid grid-cols-2 border-b pb-4">
          <div className="ml-6">
            <h1 className="text-black-200 text-bold-text-40 mb-3">
              {data.name}
            </h1>
            <div className="flex items-center gap-3">
              <span className="flex-center h-[26px] w-[45px] rounded-[5px] bg-rose-100 text-sm font-bold text-red-500">
                -{data.discount_rate}%
              </span>
              <span className="text-black-200 text-[29px] font-bold">
                {data.price.toLocaleString()}원
              </span>
              {data.original_price !== null && (
                <span className="ml-2 text-sm text-gray-700 line-through">
                  {data.original_price.toLocaleString()}원
                </span>
              )}
            </div>
          </div>
          <div className="mr-2 mb-3 flex items-center justify-end gap-2">
            <StarRating defaultRating={5} readOnly />
            <span className="mr-2 text-sm text-gray-700 underline">
              ({data.review_count}개의 리뷰)
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 border-b border-gray-300 pb-5">
          <div className="flex items-center">
            <div>수량</div>
            <div className="bg-gray-10 ml-[110px] inline-flex h-8 w-20 items-center justify-center rounded-[5px]">
              <Button
                variant="ICON"
                aria-label="수량 감소"
                onClick={onDecreaseQuantity}
                disabled={quantity <= 1}
                className={cn(
                  'flex-center h-[15px] w-[15px] cursor-pointer rounded-[4px] bg-gray-100',
                  quantity <= 1 && 'cursor-not-allowed opacity-50'
                )}
              >
                <Minus size={16} />
              </Button>
              <span className="w-6 text-center">{quantity}</span>
              <Button
                variant="ICON"
                aria-label="수량 증가"
                onClick={onIncreaseQuantity}
                className="flex-center bg-black-100 text-white-100 h-[15px] w-[15px] cursor-pointer rounded-[4px]"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          {dropdownOptions.DETAIL_DROPDOWN.map((field) => (
            <div
              key={field.key}
              className="text-black-200 flex items-center justify-between gap-2"
            >
              <div className="text-black-200 font-semibold">{field.label}</div>
              <Dropdown
                options={field.options}
                onSelect={(option) =>
                  handleDropdownChange(field.key, option.value)
                }
                placeholder={field.placeholder}
                className="h-[30px] w-[463px] cursor-pointer"
              />
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="mb-9 flex items-center justify-between">
            <span className="text-gray-700">총 상품 금액</span>
            <span className="text-black-200 text-[30px] font-bold">
              {(data.price * quantity).toLocaleString()}원
            </span>
          </div>

          <div className="flex gap-[10px]">
            <Button variant="VARIANT12" onClick={onAddCart}>
              장바구니
            </Button>
            <Button variant="VARIANT13" onClick={onPurchase}>
              구매하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailProduct
