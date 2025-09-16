import { InputHTMLAttributes } from 'react'

import SearchIcon from '@/assets/icons/input/search.svg'
import Button from '@/components/common/Button'
import {
  INPUT_VARIANTS,
  DEFAULT_INPUT_VARIANT,
  InputVariant,
} from '@/foundations/input'
import { cn } from '@/utils/cn'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  placeholder: string
  variant?: InputVariant
  maxLength?: number
  inputType?: 'nickname' | 'search'
}

const Input = ({
  inputType = 'nickname',
  type = 'text',
  placeholder,
  variant = DEFAULT_INPUT_VARIANT,
  maxLength,
  className,
  ...props
}: InputProps) => {
  return (
    <div className="relative inline-flex items-center">
      <label htmlFor={inputType} className="sr-only">
        {placeholder}
      </label>
      <input
        type={type}
        inputMode={inputType === 'search' ? 'search' : 'text'}
        placeholder={placeholder}
        maxLength={maxLength}
        className={cn('outline-none', INPUT_VARIANTS[variant], className)}
        {...props}
      />
      {inputType === 'search' && (
        <Button
          variant="ICON"
          aria-label="검색"
          className="absolute top-1/2 right-2 -translate-y-1/2"
        >
          <img
            src={SearchIcon.src}
            alt="검색"
            width={18}
            height={18}
            aria-hidden="true"
          />
        </Button>
      )}
    </div>
  )
}

export default Input
