export const INPUT_VARIANTS = {
  NICKNAME: [
    'h-9',
    'w-48',
    'border',
    'px-4',
    'text-black-200',
    'border-gray-300',
    'rounded-md',
    'bg-white-100',
  ].join(' '),
  SEARCH: [
    'h-8',
    'w-90',
    'border-b-2',
    'border-black-100',
    'px-2.5',
    'bg-white-100',
  ].join(' '),
} as const

export const DEFAULT_INPUT_VARIANT = 'NICKNAME'

export type InputVariant = keyof typeof INPUT_VARIANTS
