'use client'

import { Button, AlarmModal, EditNickNameModal } from '@/components'
import ResignationModal from '@/components/common/modal/ResignationModal'
import { useEditPage, useEditPageModals } from '@/hooks/my-page'
import { useLoginStore } from '@/stores/useLoginStore'
import { getUsername } from '@/utils/getUsername'

const Edit = () => {
  const { nickNameModal, alarmModal, resignationModal } = useEditPageModals()
  const { selected, handleMarketingChange } = useEditPage({
    openAlarmModal: alarmModal.open,
  })
  const { user } = useLoginStore()
  const username = getUsername(user, '사용자')

  const MARKETING = [
    { id: 'agree', value: '동의' },
    { id: 'disagree', value: '비동의' },
  ]

  return (
    <main className="flex h-screen w-320 flex-col">
      <header className="border-black-100 border-b-2 pb-5">
        <h1 className="text-black-200 text-2xl font-bold">회원정보 수정</h1>
      </header>

      <section className="flex h-full flex-col justify-between">
        <article className="flex flex-col gap-5">
          <dl className="grid h-14 grid-cols-[1fr_3.92fr] items-center border-b border-gray-100">
            <dt className="text-black-200 font-semibold">닉네임</dt>
            <dd className="flex items-center gap-3">
              <p>{username}</p>
              <Button
                variant="ICON"
                aria-label="닉네임 수정"
                onClick={nickNameModal.open}
                className="text-black-200 h-9 w-14 rounded-md bg-gray-50 text-sm"
              >
                수정
              </Button>
            </dd>
            <EditNickNameModal
              isOpen={nickNameModal.isOpen}
              onClose={nickNameModal.close}
            />
          </dl>
          <dl className="grid h-14 grid-cols-[1fr_3.92fr] items-center border-b border-gray-100">
            <dt className="text-black-200 font-semibold">
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
                    className="mr-2 accent-red-500"
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
            className="w-[66px] border-b border-gray-700 text-gray-700"
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
