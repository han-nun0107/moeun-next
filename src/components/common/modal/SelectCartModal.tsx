'use client'

import selectCart from '@/assets/icons/my-page/select-cart.svg'
import { Dropdown, Modal, Button } from '@/components'
import { MY_PAGE } from '@/constants/my-page/myPage'
import { useSelectCartModal } from '@/hooks/my-page/useSelectCartModal'
import { recommendedDropdown } from '@/mocks/modal/recommendedDropdown'
import { cn } from '@/utils/cn'

const SelectCartModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const { setSelectedRegion, pickupDate, setPickupDate, handleClick } =
    useSelectCartModal()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <article className="flex-center flex-col">
        <div>
          <img
            src={selectCart.src}
            alt="장바구니 아이콘"
            aria-label="장바구니 아이콘"
          />
        </div>
        <div className="text-black-200 mt-6 text-center text-lg font-medium">
          <p>장바구니에 상품이 정상적으로 담겼습니다.</p>
          <p>주문 지역 선택과 픽업 날짜 필수로 선택해 주세요</p>
        </div>
        <div className="flex-center mt-6 flex-col gap-5">
          <div className="flex-center mt-6 gap-7">
            <p className="text-black-200 text-base font-medium">
              주문 지역 선택
            </p>
            <Dropdown
              options={recommendedDropdown}
              onSelect={(option) => setSelectedRegion(option)}
              className="w-66"
            />
          </div>
          <div className="flex items-center justify-between gap-16">
            <p className="text-black-200 text-base font-medium">픽업날짜</p>
            {/* TODO: 커스텀 날짜로 변경 */}
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="h-8 w-66 rounded-[5px] border border-[#d9d9d9] px-3"
            />
          </div>
        </div>
        <div className="flex-center mt-12 gap-2">
          {MY_PAGE.BUTTON_VALUE.map((button) => (
            <Button
              key={button.value}
              variant="ORDER_DATE"
              onClick={() => handleClick(button.type as 'CART' | 'CONTINUE')}
              className={cn(
                button.type === 'CART' ? 'bg-[#f2544b]' : 'bg-[#0f0f0f]'
              )}
            >
              {button.label}
            </Button>
          ))}
        </div>
      </article>
    </Modal>
  )
}

export default SelectCartModal
