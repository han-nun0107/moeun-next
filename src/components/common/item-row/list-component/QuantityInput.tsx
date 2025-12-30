import { useEffect, useState } from 'react'

import MinusIcon from '@/assets/icons/cart/minus.svg'
import PlusIcon from '@/assets/icons/cart/plus.svg'
import Button from '@/components/common/Button'

type QuantityInputProps = {
  value: number
  onIncrease: () => void
  onDecrease: () => void
  onChange?: (newValue: number) => void
}

const QuantityInput = ({
  value,
  onIncrease,
  onDecrease,
  onChange,
}: QuantityInputProps) => {
  const [inputValue, setInputValue] = useState<string>(String(value))

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)

    if (newValue === '') {
      return
    }

    const numValue = parseInt(newValue, 10)
    if (!isNaN(numValue) && numValue >= 1) {
      onChange?.(numValue)
    }
  }

  const handleBlur = () => {
    const numValue = parseInt(inputValue, 10)
    if (isNaN(numValue) || numValue < 1) {
      setInputValue(String(value))
    } else {
      onChange?.(numValue)
    }
  }

  useEffect(() => {
    setInputValue(String(value))
  }, [value])

  return (
    <div className="flex items-center gap-2">
      <Button
        aria-label="수량 감소"
        onClick={onDecrease}
        variant="ICON"
        className="bg-gray-320 rounded-[4px]"
      >
        <img src={MinusIcon.src} alt="minus" />
      </Button>

      <input
        type="text"
        inputMode="numeric"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className="w-6 border-0 bg-transparent text-center outline-none"
        min={1}
      />

      <Button
        aria-label="수량 증가"
        onClick={onIncrease}
        variant="ICON"
        className="bg-black-100 rounded-[4px]"
      >
        <img src={PlusIcon.src} alt="plus" />
      </Button>
    </div>
  )
}

export default QuantityInput
