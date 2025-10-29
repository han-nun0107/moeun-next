export const BUTTON_VARIANTS = {
  /* 로그아웃 버튼 */
  OUTLINE: [
    'h-13',
    'w-30',
    'rounded-4xl',
    'border',
    'border-[#d9d9d9]',
    'font-semibold',
    'text-[#666666]',
  ].join(' '),

  /* 로그인 버튼 */
  CONTAINED: [
    'h-13',
    'w-41',
    'rounded-[60px]',
    'bg-[#f2544b]',
    'text-center',
    'leading-[52px]',
    'font-semibold',
    'text-white',
    'hover:bg-[#e04439]',
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
    'border-[#d9d9d9]',
    'bg-white',
    'px-3',
    'text-sm',
    'text-[#666666]',
    'hover:border-[#bfbfbf]',
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
    'text-[#333]',
  ].join(' '),

  /* 피드백 버튼 */
  FEEDBACK: [
    'w-35',
    'h-12',
    'bg-[#f2f2f2]',
    'text-[#333333]',
    'text-lg',
    'rounded-md',
    'tracking-[0.05em]',
  ].join(' '),

  /* 본품 구매하기 */
  BUY: [
    'w-36',
    'h-12',
    'bg-[#000000]',
    'text-[#ffffff]',
    'tracking-[0.05em]',
    'rounded-md',
  ].join(' '),

  /*메인페이지 테스트하기 버튼 */
  MAIN_TEST: [
    'w-49',
    'h-14',
    'bg-[#2e2f2f]',
    'text-[#ffffff]',
    'text-lg',
    'tracking-[0.05em]',
    'rounded-md',
  ].join(' '),

  /* 테스트 페이지 테스트하기 버튼 */
  TEST: [
    'w-115',
    'h-15',
    'bg-[#2d2d2d]',
    'text-[#ffffff]',
    'text-2xl',
    'font-bold',
    'tracking-[0.05em]',
    'rounded-[60px]',
  ].join(' '),

  /* 테스트 페이지 회원가입 버튼 */
  TEST_JOIN: [
    'w-115',
    'h-14',
    'bg-[#fff]',
    'text-[#2e2f2f]',
    'text-2xl',
    'font-bold',
    'tracking-[0.05em]',
    'rounded-[60px]',
  ].join(' '),

  /* 테스트 페이지 하단 버튼 */
  TEST_BOTTOM: [
    'w-[225px]',
    'h-[54px]',
    'text-[#fff]',
    'text-lg',
    'font-bold',
    'border',
    'border-[#fff]',
    'rounded-[60px]',
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
  TEST_BUTTON: ['w-115 h-14 rounded-[60px] border border-[#F2544B]'].join(' '),

  /* 제품 검색 필터 적용하기 버튼 */
  FILTER_BUTTON: [
    'w-29 h-10 rounded-[6px] border border-[#d9d9d9] bg-[#333] text-[#fff] font-base',
  ].join(' '),

  /* 후기 페이지 후기 버튼 */
  REVIEW_BUTTON: [
    'w-[570px] h-18 bg-[#f2544b] rounded-[8px] font-bold text-[#fff] text-[22px]',
  ].join(' '),
} as const

export const DEFAULT_BUTTON_VARIANT = 'CONTAINED'

export type ButtonVariant = keyof typeof BUTTON_VARIANTS
