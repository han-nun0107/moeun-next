import { ButtonHTMLAttributes } from 'react'
import {
  BUTTON_VARIANTS,
  ButtonVariant,
  DEFAULT_BUTTON_VARIANT,
} from '@/foundations/button'
import { cn } from '@/utils/cn'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const Button = ({
  children,
  variant = DEFAULT_BUTTON_VARIANT,
  className,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn('cursor-pointer', BUTTON_VARIANTS[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
