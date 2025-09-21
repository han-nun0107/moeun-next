'use client'

import { useCallback, useEffect, useRef } from 'react'

type UseModalProps = {
  isOpen: boolean
  onClose: () => void
  isCloseable?: boolean
}

export const useModal = ({
  isOpen,
  onClose,
  isCloseable = true,
}: UseModalProps) => {
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleEsc = (e: KeyboardEvent) => {
      if (isCloseable && e.key === 'Escape') {
        onCloseRef.current()
      }
    }

    document.addEventListener('keydown', handleEsc)

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen, isCloseable])

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isCloseable && e.target === e.currentTarget) {
        onCloseRef.current()
      }
    },
    [isCloseable]
  )

  const handleClose = useCallback(() => {
    if (isCloseable) {
      onCloseRef.current()
    }
  }, [isCloseable])

  return {
    handleOverlayClick,
    handleClose,
  }
}
