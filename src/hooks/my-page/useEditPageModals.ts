import { useModalState } from '@/hooks/useModalState'

export const useEditPageModals = () => {
  const { isOpen: isNickNameModalOpen, openModal: openNickNameModal, closeModal: closeNickNameModal } = useModalState()
  const { isOpen: isAlarmModalOpen, openModal: openAlarmModal, closeModal: closeAlarmModal } = useModalState()
  const { isOpen: isResignationModalOpen, openModal: openResignationModal, closeModal: closeResignationModal } = useModalState()

  return {
    nickNameModal: {
      isOpen: isNickNameModalOpen,
      open: openNickNameModal,
      close: closeNickNameModal,
    },
    alarmModal: {
      isOpen: isAlarmModalOpen,
      open: openAlarmModal,
      close: closeAlarmModal,
    },
    resignationModal: {
      isOpen: isResignationModalOpen,
      open: openResignationModal,
      close: closeResignationModal,
    },
  }
}
