'use client'

import { type ReactNode } from 'react'
import FocusLock from 'react-focus-lock'

import CloseIcon from '@/assets/icons/modal/close.svg'
import Portal from '@/components/common/modal/Portal'
import { PORTAL_CONTAINER_ID } from '@/constants'
import { Z_INDEX } from '@/foundations/zIndex'
import { useModal } from '@/hooks/useModal'
import { cn } from '@/utils/cn'

import Button from './Button'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  isCloseable?: boolean
  className?: string
}

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  isCloseable = true,
  className,
}: ModalProps) => {
  const { handleOverlayClick, handleClose } = useModal({
    isOpen,
    onClose,
    isCloseable,
  })

  if (!isOpen) return null

  return (
    <Portal containerId={PORTAL_CONTAINER_ID.MODAL}>
      <div
        onClick={handleOverlayClick}
        className="flex-center fixed inset-0 bg-black/25"
        style={{ zIndex: Z_INDEX.MODAL_OVERLAY }}
      >
        <FocusLock>
          <div
            role="dialog"
            aria-modal="true"
            {...(title && { 'aria-labelledby': 'modal-title' })}
            className={cn(
              'relative flex w-170 flex-col items-center rounded-[20px] bg-white px-[40px] py-[100px]',
              className
            )}
            style={{ zIndex: Z_INDEX.MODAL }}
          >
            {title && (
              <h2
                id="modal-title"
                className="text-black-200 text-bold-text-32 text-center whitespace-pre-wrap"
              >
                {title}
              </h2>
            )}
            {children}
            {isCloseable && (
              <Button
                aria-label="닫기"
                onClick={handleClose}
                variant="ICON"
                className="absolute top-10 right-8"
              >
                <img src={CloseIcon.src} />
              </Button>
            )}
          </div>
        </FocusLock>
      </div>
    </Portal>
  )
}

export default Modal
