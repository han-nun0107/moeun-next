import fullHeart from '@/assets/icons/card/fullHeart.svg'
import heartButton from '@/assets/icons/card/heartButton.svg'
import Button from '@/components/common/Button'
import { Z_INDEX } from '@/foundations/zIndex'
import { cn } from '@/utils/cn'

type HeartButtonProps = {
  className?: string
  isLiked: boolean
  onClick: () => void
}

const HeartButton = ({
  className = '',
  isLiked,
  onClick,
}: HeartButtonProps) => {
  const icon = isLiked ? fullHeart : heartButton
  return (
    <Button
      variant="LIKE"
      className={cn(className)}
      style={{ zIndex: Z_INDEX.LIKE }}
      aria-label={isLiked ? '찜 취소' : '찜하기'}
      onClick={onClick}
    >
      <img
        src={icon.src}
        alt={isLiked ? '찜 취소' : '찜하기'}
        width={30}
        height={30}
      />
    </Button>
  )
}

export default HeartButton
