import {
  BUTTON_VARIANTS,
  ButtonVariant,
  DEFAULT_BUTTON_VARIANT,
} from '@/foundations/button'
import { cn } from '@/utils/cn'

type ButtonProps = {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  variant?: ButtonVariant
  className?: string
  'aria-label'?: string
}

const Button = ({
  children,
  onClick,
  disabled = false,
  variant = DEFAULT_BUTTON_VARIANT,
  className,
  'aria-label': ariaLabel,
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn('cursor-pointer', BUTTON_VARIANTS[variant], className)}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

export default Button
