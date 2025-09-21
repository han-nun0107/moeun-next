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
} as const

export const DEFAULT_BUTTON_VARIANT = 'CONTAINED'

export type ButtonVariant = keyof typeof BUTTON_VARIANTS
