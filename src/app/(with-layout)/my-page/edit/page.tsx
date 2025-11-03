'use client'

import { useState } from 'react'

import { Button, AlarmModal, EditNickNameModal } from '@/components'
import ResignationModal from '@/components/common/modal/ResignationModal'
import { useEditPage } from '@/hooks/my-page/useEditPage'
import { useEditPageModals } from '@/hooks/my-page/useEditPageModals'

const Edit = () => {
  const { nickNameModal, alarmModal, resignationModal } = useEditPageModals()
  const { selected, handleMarketingChange } = useEditPage()

  const MARKETING = [
    { id: 'agree', value: '동의' },
    { id: 'disagree', value: '비동의' },
  ]

  return (
    <main className="flex h-screen w-320 flex-col">
      <header className="border-b-2 border-[#000] pb-5">
        <h1 className="text-2xl font-bold text-[#333]">회원정보 수정</h1>
      </header>

      <section className="flex h-full flex-col justify-between">
        <article className="flex flex-col gap-5">
          <dl className="grid h-14 grid-cols-[1fr_3.92fr] items-center border-b border-[#e1e1e1]">
            <dt className="font-semibold text-[#333]">닉네임</dt>
            <dd className="flex items-center gap-3">
              <p>김오즈</p>
              <Button
                variant="ICON"
                aria-label="닉네임 수정"
                onClick={nickNameModal.open}
                className="h-9 w-14 rounded-md bg-[#f2f2f2] text-sm text-[#333]"
              >
                수정
              </Button>
            </dd>
            <EditNickNameModal
              isOpen={nickNameModal.isOpen}
              onClose={nickNameModal.close}
            />
          </dl>
          <dl className="grid h-14 grid-cols-[1fr_3.92fr] items-center border-b border-[#e1e1e1]">
            <dt className="font-semibold text-[#333]">
              마케팅, 알림 수신 여부
            </dt>
            <dd className="flex items-center gap-10">
              {MARKETING.map((item) => (
                <div key={item.id} className="flex items-center">
                  <input
                    id={item.id}
                    type="radio"
                    name="marketing"
                    value={item.value}
                    checked={selected === item.value}
                    onChange={handleMarketingChange}
                    className="mr-2 accent-[#f2544b]"
                  />
                  <label htmlFor={item.id}>{item.value}</label>
                </div>
              ))}
            </dd>
          </dl>
          <AlarmModal isOpen={alarmModal.isOpen} onClose={alarmModal.close} />
        </article>

        <footer className="flex w-full justify-center pb-25">
          <Button
            variant="ICON"
            aria-label="회원 탈퇴"
            onClick={resignationModal.open}
            className="w-[66px] border-b border-[#666] text-[#666]"
          >
            회원 탈퇴
          </Button>
        </footer>
        <ResignationModal
          isOpen={resignationModal.isOpen}
          onClose={resignationModal.close}
        />
      </section>
    </main>
  )
}

export default Edit
