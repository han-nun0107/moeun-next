import { ROUTE_PATHS } from '../routePaths'

export const COMPLETE_ERROR_MESSAGES = {
  SERVER_ERROR: '서버 설정 오류가 발생했습니다.',
  NO_ORDER_ID: '주문 정보를 찾을 수 없습니다.',
  FETCH_ERROR: '결제 정보를 불러오는 중 오류가 발생했습니다.',
} as const

export const COMPLETE_SUCCESS_MESSAGES = {
  TITLE: '결제가 완료되었습니다',
  DESCRIPTION: '주문이 정상적으로 처리되었습니다.',
} as const

export const COMPLETE_BUTTON_ITEMS = [
  {
    href: ROUTE_PATHS.HOME,
    variant: 'CONTAINED' as const,
    label: '홈으로 이동',
  },
  {
    href: ROUTE_PATHS.MYPAGE.ORDER_HISTORY,
    variant: 'OUTLINE' as const,
    label: '주문 내역 보기',
  },
] as const

export const PAYMENT_INFO_LABELS = {
  ORDER_NAME: '결제상품',
  ORDER_ID: '주문 번호',
  CARD_NUMBER: '카드번호',
  CARD_TYPE: '카드 타입',
  AMOUNT: '결제금액',
  APPROVED_AT: '결제일시',
} as const

export const DEFAULT_MESSAGES = {
  NO_INFO: '정보 없음',
  NO_APPROVED_TIME: '승인시간 정보 없음',
} as const
