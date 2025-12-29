'use client'

import { Equal } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button, ItemRowContent } from '@/components/common'
import { useCart } from '@/hooks/cart/useCart'
import useCartItem from '@/hooks/item-row/useCartItem'
import { useLoginStore } from '@/stores/useLoginStore'
import { convertCartId } from '@/utils/cart/idConverter'

const Cart = () => {
  const router = useRouter()
  const { user, isLoggedIn } = useLoginStore()
  const {
    cartData,
    isLoading,
    isError,
    updateQuantity,
    deleteItem,
    onPayment,
  } = useCart()

  const handleQuantityChange = (
    itemId: number | string,
    newQuantity: number
  ) => {
    const cartId = convertCartId(itemId)
    if (cartId !== null) {
      updateQuantity({ cartId, quantity: newQuantity })
    }
  }

  const handleDelete = (itemId: number | string) => {
    const cartId = convertCartId(itemId)
    if (cartId !== null) {
      if (confirm('장바구니에서 이 상품을 삭제하시겠습니까?')) {
        deleteItem(cartId)
      }
    }
  }

  const { data, onCheckChange, checkedTotalPrice, checkedItems } = useCartItem({
    data: cartData,
  })

  if (!isLoggedIn || !user) {
    return (
      <div className="flex-center mt-25 flex-col">
        <h1 className="text-black-200 text-bold-text-40 mb-4">장바구니</h1>
        <p className="mb-4 text-gray-600">로그인이 필요합니다.</p>
        <Button variant="CONTAINED" onClick={() => router.push('/login')}>
          로그인하기
        </Button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex-center mt-25 flex-col">
        <h1 className="text-black-200 text-bold-text-40">장바구니</h1>
        <p className="mt-4 text-gray-600">장바구니를 불러오는 중...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex-center mt-25 flex-col">
        <h1 className="text-black-200 text-bold-text-40">장바구니</h1>
        <p className="mt-4 text-red-500">
          장바구니를 불러오는 중 오류가 발생했습니다.
        </p>
      </div>
    )
  }

  return (
    <div className="flex-center mt-25 flex-col">
      <h1 className="text-black-200 text-bold-text-40">장바구니</h1>
      <ItemRowContent
        type="cart"
        items={
          data?.cart_items?.map((item) => ({
            ...item,
            type: 'cart',
          })) || []
        }
        onQuantityChange={handleQuantityChange}
        onDelete={handleDelete}
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
              onPayment(checkedTotalPrice, checkedItems)
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
