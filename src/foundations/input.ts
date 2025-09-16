export const INPUT_VARIANTS = {
  NICKNAME: [
    'h-9',
    'w-48',
    'border',
    'px-4',
    'text-[#333]',
    'border-[#d9d9d9]',
    'rounded-[6px]',
    'bg-[#fff]',
  ].join(' '),
  SEARCH: [
    'h-8',
    'w-90',
    'border-b-2',
    'border-b-[#000]',
    'px-[10px]',
    'bg-[#fff]',
  ].join(' '),
} as const

export const DEFAULT_INPUT_VARIANT = 'NICKNAME'

export type InputVariant = keyof typeof INPUT_VARIANTS
