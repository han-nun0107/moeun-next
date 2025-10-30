import { Button } from '@/components'
import { TasteTypeResult, TasteFingerprint } from '@/components/my-page'

const MyPage = () => {
  return (
    <section className="mr-80 mb-25">
      <div className="flex items-center justify-between border-b-2 border-[#000] pb-5">
        <h1 className="text-2xl font-bold text-[#333]">나의 입맛 프로필</h1>
        <Button variant="MY_PAGE_PACKAGE">나만의 패키지 구성하기</Button>
      </div>
      <TasteTypeResult />
      <TasteFingerprint />
    </section>
  )
}

export default MyPage
