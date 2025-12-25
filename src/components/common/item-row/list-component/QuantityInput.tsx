import MinusIcon from '@/assets/icons/cart/minus.svg'
import PlusIcon from '@/assets/icons/cart/plus.svg'
import Button from '@/components/common/Button'

type QuantityInputProps = {
  value: number
  onIncrease: () => void
  onDecrease: () => void
}

const QuantityInput = ({
  value,
  onIncrease,
  onDecrease,
}: QuantityInputProps) => {
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

      <span className="w-6 text-center">{value}</span>

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