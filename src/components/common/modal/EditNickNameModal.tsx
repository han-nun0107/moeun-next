import { Button, Input, Modal } from '@/components'
import { ModalProps } from '@/types/modal/modal'

const EditNickNameModal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="닉네임 수정" isCloseable>
      <div className="flex-center mt-13 gap-2">
        <div className="flex items-center gap-13">
          <label
            htmlFor="nickname-input"
            className="text-black-200 text-lg font-medium"
          >
            닉네임
          </label>
          <Input
            id="nickname-input"
            placeholder="닉네임을 입력해주세요"
            type="text"
          />
        </div>
        <Button variant="NICKNAME" aria-label="닉네임 수정" onClick={onClose}>
          수정
        </Button>
      </div>
    </Modal>
  )
}

export default EditNickNameModal
