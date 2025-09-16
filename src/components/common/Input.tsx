import { InputHTMLAttributes } from 'react'

import SearchIcon from '@/assets/icons/input/search.svg'
import Button from '@/components/common/Button'
import { INPUT_VARIANTS, InputVariant } from '@/foundations/input'
import { cn } from '@/utils/cn'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id?: string
  placeholder: string
  maxLength?: number
  inputType?: 'nickname' | 'search'
}

const Input = ({
  id,
  inputType = 'nickname',
  type = 'text',
  placeholder,
  maxLength,
  className,
  ...props
}: InputProps) => {
  const variant = inputType.toUpperCase() as InputVariant

  return (
    <div className="relative inline-flex items-center">
      <label htmlFor={id ?? inputType} className="sr-only">
        {placeholder}
      </label>
      <input
        id={id ?? inputType}
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
