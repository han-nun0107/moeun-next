'use client'

import { Equal } from 'lucide-react'

import Button from '@/components/common/Button'
import ItemRowContent from '@/components/common/ItemRowContent'
import useCartItem from '@/hooks/item-row/useCartItem'
import { mockCartResponse } from '@/mocks/cart/cart'

const Cart = () => {
  const invalidateCart = () => {}

  const {
    data,
    updateQuantityAndTotals,
    onCheckChange,
    checkedTotalPrice,
    checkedItems,
  } = useCartItem({
    quantity: mockCartResponse.cart_items.reduce(
      (total, item) => total + (item.quantity || 0),
      0
    ),
    data: mockCartResponse,
    onQuantityChange: invalidateCart,
  })

  return (
    <div className="flex-center mt-25 flex-col">
      <h1 className="text-black-200 text-[40px] font-bold">장바구니</h1>
      <ItemRowContent
        type="cart"
        items={
          data?.cart_items?.map((item) => ({
            ...item,
            type: 'cart',
          })) || []
        }
        onQuantityChange={updateQuantityAndTotals}
        checkedItems={checkedItems}
        onCheckChange={onCheckChange}
      />
      {data?.cart_items && data.cart_items.length > 0 && (
        <>
          <div className="mt-25 h-20 w-320 bg-gray-50">
            <div className="flex-center h-full w-full gap-7">
              <div className="text-black-200">
                상품금액 합계
                <span className="ml-3 text-2xl font-bold">
                  {checkedTotalPrice.toLocaleString()}원
                </span>
              </div>
              <div className="flex-center text-bold-lg text-white-100 h-7 w-7 rounded-[50%] bg-red-500 text-center">
                <Equal size={15} strokeWidth={4} />
              </div>
              <div className="text-black-200">
                총 결제 금액
                <span className="ml-3 text-2xl font-bold">
                  {checkedTotalPrice.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="CARD_PAY"
            className="mt-12 mb-25"
            onClick={() => {
              if (checkedItems.length === 0) {
                alert('결제할 상품을 선택해주세요.')
                return
              }
              alert('결제되었습니다 (mock)!')
            }}
          >
            결제하기
          </Button>
        </>
      )}
    </div>
  )
}

export default Cart
