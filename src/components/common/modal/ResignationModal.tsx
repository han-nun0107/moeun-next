import { Button, Modal } from '@/components'
import { ModalProps } from '@/types/modal/modal'

const ResignationModal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <p className="text-black-200 text-lg font-medium">탈퇴하시겠습니까?</p>
      <p className="text-black-200 text-lg font-medium">
        모든 정보는 삭제됩니다.
      </p>
      <Button
        variant="RECOMMENDED_BUY"
        aria-label="탈퇴"
        onClick={onClose}
        className="mt-12"
      >
        탈퇴
      </Button>
    </Modal>
  )
}

export default ResignationModal
