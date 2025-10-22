import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

import Share from '@/assets/icons/test/share.svg'
import { Button, Modal } from '@/components'
import { IMAGE_URLS } from '@/constants'

import TestModal from './TestModal'

type StepType = 'main' | 'question' | 'result'

type MainTestProps = {
  setStep: Dispatch<SetStateAction<StepType>>
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  isModalOpen: boolean
}

const MainStep = ({ setStep, setIsModalOpen, isModalOpen }: MainTestProps) => {
  const handleOpenModal = () => {
    setIsModalOpen(true)
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <div className="mt-19 flex flex-col gap-2 text-center">
        <h1 className="text-[40px] font-bold text-[#333]">
          내 입맛에 맞는 전통주는?
        </h1>
        <div className="text-lg text-[#666]">
          <p>나는 어떤 입맛일까?</p>
          <p>테스트 후 나만의 전통주를 찾아보세요!</p>
        </div>
      </div>

      <Image
        src={IMAGE_URLS.Test.Main}
        alt="테스트 이미지"
        width={380}
        height={320}
      />

      <Button variant="TEST" onClick={() => setStep('question')}>
        테스트 시작하기
      </Button>

      <div
        className="flex cursor-pointer items-center gap-5"
        role="button"
        aria-label="결과 공유하기"
        onClick={handleOpenModal}
      >
        <Image src={Share.src} alt="공유하기 버튼" width={17} height={19} />
        <p>공유하기</p>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <TestModal />
        </Modal>
      )}
    </>
  )
}

export default MainStep
