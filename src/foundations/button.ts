import { text } from 'stream/consumers'

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
} as const

export const DEFAULT_BUTTON_VARIANT = 'CONTAINED'

export type ButtonVariant = keyof typeof BUTTON_VARIANTS
