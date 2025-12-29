// ISO 8601 date-time string
export type ISODateTimeString = string

// 결제 타입
export type PaymentType = 'NORMAL' | 'BILLING' | 'BRANDPAY'

// 결제 상태
export type PaymentStatus =
  | 'READY'
  | 'IN_PROGRESS'
  | 'WAITING_FOR_DEPOSIT'
  | 'DONE'
  | 'CANCELED'
  | 'PARTIAL_CANCELED'
  | 'ABORTED'
  | 'EXPIRED'

// 결제수단(문서에 나온 한국어 기준)
export type PaymentMethod =
  | '카드'
  | '가상계좌'
  | '간편결제'
  | '휴대폰'
  | '계좌이체'
  | '문화상품권'
  | '도서문화상품권'
  | '게임문화상품권'

/** 카드 타입/소유자/매입상태 */
export type CardType = '신용' | '체크' | '기프트' | '미확인'
export type CardOwnerType = '개인' | '법인' | '미확인'
export type CardAcquireStatus =
  | 'READY'
  | 'REQUESTED'
  | 'COMPLETED'
  | 'CANCEL_REQUESTED'
  | 'CANCELED'

// 할부 수수료 부담 주체
export type InterestPayer = 'BUYER' | 'CARD_COMPANY' | 'MERCHANT'

// 가상계좌 타입/환불/정산
export type VirtualAccountType = '일반' | '고정'
export type RefundStatus =
  | 'NONE'
  | 'PENDING'
  | 'FAILED'
  | 'PARTIAL_FAILED'
  | 'COMPLETED'
export type SettlementStatus = 'INCOMPLETED' | 'COMPLETED'

// 취소 상태
export type CancelStatus = 'DONE'

// 국가코드 (ISO-3166 alpha-2)
export type CountryCode = string

// metadata: 최대 5개 키-값. 타입은 안전하게 Record로
export type PaymentMetadata = Record<string, string>

export type PaymentCancel = {
  cancelAmount: number
  cancelReason: string
  taxFreeAmount: number
  taxExemptionAmount: number // 문서에 integer
  refundableAmount: number
  cardDiscountAmount: number
  transferDiscountAmount: number
  easyPayDiscountAmount: number
  canceledAt: ISODateTimeString
  transactionKey: string
  receiptKey: string | null
  cancelStatus: CancelStatus
  cancelRequestId: string | null
}

export type PaymentCard = {
  amount: number
  issuerCode: string
  acquirerCode: string | null
  number: string // 마스킹 포함
  installmentPlanMonths: number
  approveNo: string
  useCardPoint: boolean
  cardType: CardType
  ownerType: CardOwnerType
  acquireStatus: CardAcquireStatus
  isInterestFree: boolean
  interestPayer: InterestPayer | null
}

export type RefundReceiveAccount = {
  bankCode: string
  accountNumber: string
  holderName: string
}

export type PaymentVirtualAccount = {
  accountType: VirtualAccountType
  accountNumber: string
  bankCode: string
  customerName: string
  depositorName: string
  dueDate: ISODateTimeString
  refundStatus: RefundStatus
  expired: boolean
  settlementStatus: SettlementStatus
  refundReceiveAccount: RefundReceiveAccount | null

  // 웹훅 검증용 secret
  secret: string | null
}

export type PaymentMobilePhone = {
  customerMobilePhone: string
  settlementStatus: SettlementStatus
  receiptUrl: string
}

export type PaymentGiftCertificate = {
  approveNo: string
  settlementStatus: SettlementStatus
}

export type PaymentTransfer = {
  bankCode: string
  settlementStatus: SettlementStatus
}

export type PaymentReceipt = {
  url: string
}

export type PaymentCheckout = {
  url: string
}

export type PaymentEasyPay = {
  provider: string
  amount: number
  discountAmount: number
}

export type PaymentFailure = {
  code: string
  message: string
}

export type CashReceiptInfo = {
  type: '소득공제' | '지출증빙'
  receiptKey: string
  issueNumber: string
  receiptUrl: string
  amount: number
  taxFreeAmount: number
}

export type CashReceiptHistoryItem = {
  receiptKey: string
  orderId: string
  orderName: string
  type: '소득공제' | '지출증빙'
  issueNumber: string
  receiptUrl: string
  businessNumber: string
  transactionType: 'CONFIRM' | 'CANCEL'
  amount: number
  taxFreeAmount: number
  issueStatus: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED'
  failure: { code: string; message: string } | null
  customerIdentityNumber: string
  requestedAt: ISODateTimeString
}

export type PaymentDiscount = {
  amount: number // 문서 integer
}

// 메인 Payment 응답 객체
export type Payment = {
  version: string // v1.2 같은 값 또는 날짜 기반 버저닝
  paymentKey: string
  type: PaymentType
  orderId: string
  orderName: string
  mId: string
  currency: string

  method: PaymentMethod | null

  totalAmount: number
  balanceAmount: number

  status: PaymentStatus

  requestedAt: ISODateTimeString
  approvedAt: ISODateTimeString | null

  useEscrow: boolean

  lastTransactionKey: string | null

  suppliedAmount: number
  vat: number

  cultureExpense: boolean

  taxFreeAmount: number
  taxExemptionAmount: number

  cancels: PaymentCancel[] | null

  isPartialCancelable: boolean

  card: PaymentCard | null
  virtualAccount: PaymentVirtualAccount | null
  mobilePhone: PaymentMobilePhone | null
  giftCertificate: PaymentGiftCertificate | null
  transfer: PaymentTransfer | null

  metadata: PaymentMetadata | null

  receipt: PaymentReceipt | null
  checkout: PaymentCheckout | null

  easyPay: PaymentEasyPay | null

  country: CountryCode

  failure: PaymentFailure | null

  cashReceipt: CashReceiptInfo | null
  cashReceipts: CashReceiptHistoryItem[] | null

  discount: PaymentDiscount | null
}
