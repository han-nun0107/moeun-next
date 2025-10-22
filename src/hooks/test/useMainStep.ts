import { MainTestProps } from '@/types/test/test'

export const useMainStep = ({ setIsModalOpen }: MainTestProps) => {
  const handleOpenModal = () => {
    setIsModalOpen(true)
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return {
    handleOpenModal,  
    handleCloseModal,
  }
}
