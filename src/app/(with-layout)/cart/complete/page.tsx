import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/common'
import {
  COMPLETE_BUTTON_ITEMS,
  COMPLETE_ERROR_MESSAGES,
  COMPLETE_SUCCESS_MESSAGES,
  DEFAULT_MESSAGES,
} from '@/constants/cart/complete'
import { createPaymentInfoItems } from '@/utils/cart/paymentInfoItems'

type SearchParams = {
  orderId?: string
  paymentKey?: string
  amount?: string
}

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex-center mt-25 flex-col">
    <h1 className="text-black-200 text-bold-text-40 mb-4">결제 완료</h1>
    <p className={message.includes('오류') ? 'text-red-500' : 'text-gray-600'}>
      {message}
    </p>
  </div>
)

const CartComplete = async ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  const secretKey = process.env.TOSS_SECRET_KEY
  if (!secretKey) {
    return <ErrorMessage message={COMPLETE_ERROR_MESSAGES.SERVER_ERROR} />
  }

  const basicToken = Buffer.from(`${secretKey}:`).toString('base64')
  const params = searchParams

  if (!params.orderId) {
    return <ErrorMessage message={COMPLETE_ERROR_MESSAGES.NO_ORDER_ID} />
  }

  const paymentsResponse = await fetch(
    `https://api.tosspayments.com/v1/payments/orders/${params.orderId}`,
    {
      cache: 'no-store',
      headers: {
        Authorization: `Basic ${basicToken}`,
        'Content-Type': 'application/json',
      },
    }
  )

  if (!paymentsResponse.ok) {
    return <ErrorMessage message={COMPLETE_ERROR_MESSAGES.FETCH_ERROR} />
  }

  const payments = await paymentsResponse.json()
  const paymentInfoItems = createPaymentInfoItems(payments)

  return (
    <div className="flex-center mt-25 mb-25 flex-col">
      <div className="w-320">
        {/* 성공 메시지 */}
        <div className="flex-center mb-12 flex-col gap-4">
          <div className="flex-center h-20 w-20 rounded-full bg-green-100">
            <CheckCircle2
              size={48}
              className="text-green-600"
              strokeWidth={2}
            />
          </div>
          <h1 className="text-black-200 text-bold-text-40">
            {COMPLETE_SUCCESS_MESSAGES.TITLE}
          </h1>
          <p className="text-gray-600">
            {COMPLETE_SUCCESS_MESSAGES.DESCRIPTION}
          </p>
        </div>

        {/* 결제 정보 카드 */}
        <div className="mb-12 rounded-lg border-2 border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-bold-lg text-black-200 mb-6">결제 정보</h2>
          <div className="flex flex-col gap-4">
            {paymentInfoItems.map((item) => {
              const displayValue =
                item.format && typeof item.value === 'number'
                  ? item.format(item.value)
                  : item.value || DEFAULT_MESSAGES.NO_INFO

              return (
                <div
                  key={item.label}
                  className={`flex justify-between ${
                    item.isLast ? 'pt-4' : 'border-b border-gray-100 pb-4'
                  }`}
                >
                  <span className="text-gray-600">{item.label}</span>
                  <span
                    className={
                      item.isBold
                        ? 'text-bold-lg text-black-200'
                        : 'text-black-200 font-semibold'
                    }
                  >
                    {displayValue}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex-center gap-4">
          {COMPLETE_BUTTON_ITEMS.map((button) => (
            <Link key={button.href} href={button.href} className="flex-1">
              <Button variant={button.variant} className="w-full">
                {button.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CartComplete
