export const BUTTON_VARIANTS = {
  /* 로그아웃 버튼 */
  OUTLINE: [
    'h-13',
    'w-30',
    'rounded-4xl',
    'border',
    'border-gray-300',
    'font-semibold',
    'text-gray-700',
  ].join(' '),

  /* 로그인 버튼 */
  CONTAINED: [
    'h-13',
    'w-41',
    'rounded-[60px]',
    'bg-red-500',
    'text-center',
    'leading-[52px]',
    'font-semibold',
    'text-white-100',
    'hover:bg-red-550',
  ].join(' '),

  /* 아이콘 버튼 */
  ICON: '',

  /* 드롭다운 버튼 */
  DROPDOWN: [
    'flex',
    'h-full',
    'w-full',
    'items-center',
    'justify-between',
    'rounded-[5px]',
    'border',
    'border-gray-300',
    'bg-white',
    'px-3',
    'text-sm',
    'text-gray-700',
    'hover:border-gray-350',
    'focus:border-blue-500',
    'focus:outline-none',
  ].join(' '),

  /* 좋아요 버튼 */
  LIKE: ['rounded-full', 'bg-white', 'p-1', 'shadow-md'].join(' '),

  PAGINATION: [
    'h-8',
    'w-8',
    'cursor-pointer',
    'rounded-sm',
    'text-black-200',
  ].join(' '),

  /* 피드백 버튼 */
  FEEDBACK: [
    'w-35',
    'h-12',
    'bg-gray-50',
    'text-black-200',
    'text-lg',
    'rounded-md',
    'tracking-[0.05em]',
  ].join(' '),

  /* 본품 구매하기 */
  BUY: [
    'w-36',
    'h-12',
    'bg-black-100',
    'text-white-100',
    'tracking-[0.05em]',
    'rounded-md',
  ].join(' '),

  /*메인페이지 테스트하기 버튼 */
  MAIN_TEST: [
    'w-49',
    'h-14',
    'bg-gray-900',
    'text-white-100',
    'text-lg',
    'tracking-[0.05em]',
    'rounded-md',
  ].join(' '),

  /* 테스트 페이지 테스트하기 버튼 */
  TEST: [
    'w-115',
    'h-15',
    'bg-gray-920',
    'text-white-100',
    'text-2xl',
    'font-bold',
    'tracking-[0.05em]',
    'rounded-[60px]',
  ].join(' '),

  /* 테스트 페이지 회원가입 버튼 */
  TEST_JOIN: [
    'w-115',
    'h-14',
    'bg-white-100',
    'text-gray-900',
    'text-2xl',
    'font-bold',
    'tracking-[0.05em]',
    'rounded-[60px]',
  ].join(' '),

  /* 테스트 페이지 하단 버튼 */
  TEST_BOTTOM: [
    'w-[225px]',
    'h-[54px]',
    'text-white-100',
    'text-lg',
    'font-bold',
    'border-white-100',
    'circle-border',
  ].join(' '),

  /* 소셜 로그인 버튼 */
  SOCIAL: [
    'flex',
    'items-center',
    'w-full',
    'h-[56px]',
    'pl-6',
    'pr-10',
    'rounded-xl',
    'font-bold',
  ].join(' '),

  /* 테스트 페이지 버튼 A,B */
  TEST_BUTTON: ['w-115', 'h-14', 'circle-border', 'border-red-500'].join(' '),

  /* 제품 검색 필터 적용하기 버튼 */
  FILTER_BUTTON: [
    'w-29',
    'h-10',
    'rounded-[6px]',
    'border',
    'border-gray-300',
    'bg-black-200',
    'text-white-100',
    'font-base',
  ].join(' '),

  /* 후기 페이지 후기 버튼 */
  REVIEW_BUTTON: [
    'w-[570px]',
    'h-18',
    'bg-red-500',
    'rounded-[8px]',
    'font-bold',
    'text-white-100',
    'text-text-22',
  ].join(' '),

  /* 마이페이지 패키지 구성하기 버튼 */
  MY_PAGE_PACKAGE: [
    'w-44',
    'h-10',
    'bg-black-200',
    'border',
    'border-gray-300',
    'text-white-100',
    'text-base',
  ].join(' '),

  /* 마이페이지 테스트 다시하기 버튼 */
  MY_PAGE_RETRY: [
    'w-[175px]',
    'h-10',
    'bg-white-100',
    'text-red-500',
    'text-lg',
    'text-bold',
    'rounded-[60px]',
  ].join(' '),

  /* 펼쳐보기 버튼 */
  EXPAND: [
    'w-30',
    'h-10',
    'bg-white-100',
    'text-black-200',
    'text-sm',
    'rounded-[60px]',
  ].join(' '),

  /* 추천 모달 버튼 */
  RECOMMENDED: [
    'w-[74px]',
    'h-[74px]',
    'rounded-full',
    'bg-gray-50',
    'text-black-200',
    'flex-center',
  ].join(' '),

  /* 추천 모달 장바구니 버튼 */
  RECOMMENDED_BUY: [
    'w-150',
    'h-18',
    'rounded-xl',
    'bg-red-500',
    'text-white-100',
    'text-2xl',
    'font-bold',
  ].join(' '),

  /* 주문, 날짜 버튼 */
  ORDER_DATE: [
    'w-[295px]',
    'h-[65px]',
    'rounded-[12px]',
    'text-bold-lg',
    'text-white-100',
  ].join(' '),

  /* 태그 색상 */
  TAG: [
    'h-6',
    'w-13',
    'rounded-[3px]',
    'border',
    'text-text-11',
    'transition',
  ].join(' '),

  /* 피드백 보내기 버튼 */
  FEEDBACK_SUBMIT: [
    'w-[600px]',
    'h-[72px]',
    'bg-red-500',
    'rounded-lg',
    'text-2xl',
    'font-bold',
    'text-white-100',
    'tracking-[-0.02em]',
  ].join(' '),

  /* 닉네임 변경 버튼 */
  NICKNAME: [
    'w-14',
    'h-9',
    'bg-black-200',
    'rounded-[6px]',
    'text-sm',
    'text-white-100',
  ].join(' '),

  /* 카드 결제하기 버튼 */
  CARD_PAY: [
    'w-35',
    'h-13',
    'bg-gray-900',
    'rounded-md',
    'text-lg',
    'font-semibold',
    'text-white-100',
    'tracking-[-0.02em]',
  ].join(' '),

  //상세페이지 장바구니
  VARIANT12: [
    'w-[280px]',
    'h-[72px]',
    'bg-white-100',
    'rounded-[8px]',
    'text-gray-700',
    'font-bold',
    'text-lg',
    'border',
    'border-gray-700',
  ].join(' '),

  //상세페이지 구매하기
  VARIANT13: [
    'w-[280px]',
    'h-[72px]',
    'bg-red-500',
    'rounded-[8px]',
    'text-white-100',
    'font-bold',
    'text-lg',
    'border',
    'border-red-500',
  ].join(' '),
} as const

export const DEFAULT_BUTTON_VARIANT = 'CONTAINED'

export type ButtonVariant = keyof typeof BUTTON_VARIANTS
