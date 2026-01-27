import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { loadTossPayments } from '@tosspayments/tosspayments-sdk'

import {
  getCartItems,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from '@/service/cart/cart'
import { useLoginStore } from '@/stores/useLoginStore'
import type { CartResponse } from '@/types/item-row'
import { updateCartItemOptimistically } from '@/utils/cart/optimisticUpdate'
import { transformCartData } from '@/utils/cart/transformCartData'

export const useCart = () => {
  const { user } = useLoginStore()
  const queryClient = useQueryClient()

  const {
    data: cartData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['cart', user?.id],
    queryFn: async () => {
      if (!user?.id) {
        return null
      }
      const result = await getCartItems(user.id)
      if (result.error) {
        throw result.error
      }
      return transformCartData(result.data)
    },
    enabled: !!user?.id,
    staleTime: 1000 * 60,
  })

  const updateQuantityMutation = useMutation({
    mutationFn: async ({
      cartId,
      quantity,
    }: {
      cartId: number
      quantity: number
    }) => {
      const result = await updateCartItem(cartId, { quantity })
      if (result.error) {
        throw result.error
      }
      return result.data
    },
    onMutate: async ({ cartId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ['cart', user?.id] })

      const previousCartData = queryClient.getQueryData<CartResponse>([
        'cart',
        user?.id,
      ])

      if (previousCartData) {
        const updatedCartData = updateCartItemOptimistically(
          previousCartData,
          cartId,
          quantity
        )
        queryClient.setQueryData(['cart', user?.id], updatedCartData)
      }

      return { previousCartData }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousCartData) {
        queryClient.setQueryData(['cart', user?.id], context.previousCartData)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.id] })
    },
  })

  const deleteItemMutation = useMutation({
    mutationFn: async (cartId: number) => {
      const result = await deleteCartItem(cartId)
      if (result.error) {
        throw result.error
      }
      return result.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.id] })
    },
  })

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      if (!user?.id) return false
      const result = await clearCart(user.id)
      if (result.error) {
        throw result.error
      }
      return result.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.id] })
    },
  })

  const onPayment = async (checkedItems: (number | string)[]) => {
    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY
    if (!clientKey) {
      alert('클라이언트 키가 없습니다.')
      return
    }

    if (!user?.id) {
      alert('로그인이 필요합니다.')
      return
    }

    let orderId: string
    let amount: number
    let orderName: string

    try {
      const res = await fetch('/api/payments/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          checkedItems: checkedItems.map((id) =>
            typeof id === 'string' ? parseInt(id, 10) : id
          ),
        }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || '주문 생성 실패')
      }

      const orderData = await res.json()
      orderId = orderData.orderId
      amount = orderData.amount
      orderName = orderData.orderName

      if (!orderId || !amount || !orderName) {
        throw new Error('주문 정보를 받지 못했습니다')
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '주문 생성에 실패했습니다. 다시 시도해주세요.'

      alert(errorMessage)
      return
    }

    const tossPayments = await loadTossPayments(clientKey)

    const payment = tossPayments.payment({
      customerKey: user.id ? String(user.id) : 'ANONYMOUS',
    })

    await payment.requestPayment({
      method: 'CARD',
      amount: { currency: 'KRW', value: amount },
      orderId,
      orderName,
      successUrl: `${window.location.origin}/api/payment/confirm`,
      failUrl: `${window.location.origin}/cart/fail`,
    })
  }

  return {
    cartData,
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
    updateQuantity: updateQuantityMutation.mutate,
    deleteItem: deleteItemMutation.mutate,
    clearCart: clearCartMutation.mutate,
    isUpdating: updateQuantityMutation.isPending,
    isDeleting: deleteItemMutation.isPending,
    onPayment,
  }
}
