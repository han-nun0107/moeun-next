import Image from 'next/image'
import Link from 'next/link'

import kakao from '@/assets/icons/test/kakao-icon.svg'
import share from '@/assets/icons/test/share.svg'
import { Button, Card } from '@/components'
import { IMAGE_URLS } from '@/constants/imageUrls'
import { mockResultProductData } from '@/mocks/test/resultProduct'
import { useLoginStore } from '@/stores/useLoginStore'
import { getUsername } from '@/utils/getUsername'

const ResultStep = () => {
  const { isLoggedIn, user } = useLoginStore()
  const username = getUsername(user)

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex flex-col items-center gap-10">
        <p className="leading-1.3 text-text-22 mt-20 font-bold text-gray-700">
          {username}님의 취향 유형은...
        </p>
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-text-40 font-black text-orange-400">
            달콤고소파
          </h1>
          <p className="text-black-200 text-xl font-bold">
            달콤하면서도 구수한, 밸런스 좋은 맛을 선호하는 당신!
          </p>
        </div>
      </div>
      <Image
        src={IMAGE_URLS.Test.Result}
        alt="결과 캐릭터 이미지"
        width={300}
        height={300}
        className="mt-5"
      />
      <div className="mt-10 flex items-center gap-3">
        <Image src={kakao.src} alt="카카오톡 이미지" width={50} height={50} />
        <div className="flex-center h-[50px] w-[50px] rounded-4xl border border-gray-300 bg-gray-50">
          <Image src={share.src} alt="공유하기 이미지" width={24} height={28} />
        </div>
      </div>
      <div className="mt-20 flex flex-col">
        <p className="text-black-200 text-xl font-bold">
          달콤고소파 유형을 위한 첫 번째 추천 조합
        </p>
        <div className="mt-4 mb-10 flex gap-5">
          {mockResultProductData.map((product) => (
            <Card key={product.id} type="test" data={product} />
          ))}
        </div>
      </div>

      {!isLoggedIn && (
        <Link href="/login" aria-label="로그인으로 이동">
          <Button variant="TEST_JOIN" className="mb-[10px]">
            회원 가입하고 결과 저장하기
          </Button>
        </Link>
      )}
      <Link href="/mypage/taste-profile" aria-label="나만의 패키지로 이동">
        <Button variant="TEST" className="mb-5">
          이 조합으로 나만의 패키지 만들기
        </Button>
      </Link>
      <p>물론, 패키지 구성은 다음 단계에서 자유롭게 변경할 수 있어요.</p>
    </div>
  )
}

export default ResultStep
