import {
  DEFAULT_MESSAGES,
  PAYMENT_INFO_LABELS,
} from '@/constants/cart/complete'
import type { Payment } from '@/types/toss/toss'

import { formatAmount, formatDate } from './formatPayment'

export type PaymentInfoItem = {
  label: string
  value: string | number | null | undefined
  format?: (value: string | number) => string
  isLast?: boolean
  isBold?: boolean
}

export const createPaymentInfoItems = (
  payments: Payment
): PaymentInfoItem[] => {
  const { card } = payments

  return [
    {
      label: PAYMENT_INFO_LABELS.ORDER_NAME,
      value: payments?.orderName,
    },
    {
      label: PAYMENT_INFO_LABELS.ORDER_ID,
      value: payments?.orderId,
    },
    ...(card
      ? [
          {
            label: PAYMENT_INFO_LABELS.CARD_NUMBER,
            value: card?.number,
          },
          {
            label: PAYMENT_INFO_LABELS.CARD_TYPE,
            value: card?.cardType,
          },
        ]
      : []),
    {
      label: PAYMENT_INFO_LABELS.AMOUNT,
      value: payments?.totalAmount,
      format: formatAmount,
      isBold: true,
    },
    {
      label: PAYMENT_INFO_LABELS.APPROVED_AT,
      value: payments?.approvedAt
        ? formatDate(payments.approvedAt)
        : DEFAULT_MESSAGES.NO_APPROVED_TIME,
      isLast: true,
    },
  ]
}
