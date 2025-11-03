import { Modal } from '@/components'
import { ModalProps } from '@/types/modal/modal'

const AlarmModal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <p className="text-black-200 text-lg font-medium">
        마케팅 알림 수신 여부에 동의하셨습니다
      </p>
    </Modal>
  )
}

export default AlarmModal
