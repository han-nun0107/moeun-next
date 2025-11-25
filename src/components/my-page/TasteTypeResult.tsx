'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button, RetryIcon } from '@/components'
import { IMAGE_URLS } from '@/constants'
import { useLoginStore } from '@/stores/useLoginStore'
import { getUsername } from '@/utils/getUsername'

const TasteTypeResult = () => {
  const router = useRouter()
  const { user } = useLoginStore()
  const username = getUsername(user)

  return (
    <article className="flex-center flex-col">
      <div className="mt-[22px] h-93 w-315 bg-red-500">
        <p className="text-bold-lg flex-center circle-border border-white-100 text-white-100 absolute mt-5 ml-5 h-10 w-35">
          나의 취향 유형
        </p>
        <div className="flex-center h-full flex-col gap-[10px]">
          <div className="flex-center h-20 w-20 rounded-full bg-red-600">
            <Image
              src={IMAGE_URLS.MyPage.BaseTaste}
              alt="테스트 결과 이미지"
              width={60}
              height={53}
            />
          </div>
          <h1 className="text-white-100 mt-4 text-2xl font-bold">
            {username}님 취향 유형은 &apos;깔끔고소&apos; 유형입니다
          </h1>
          {/* Todo: api 연결 시 map으로 변경 예정 */}
          <p className="text-white-100 mt-3 text-lg">
            분위기를 중요하게 생각하는 당신!
          </p>
          <p className="text-white-100 text-lg">
            은은한 향과 부드러운 목넘김의 전통주와 함께라면 최고의 하루를 보낼
            수 있을거에요.
          </p>
          <Button
            variant="MY_PAGE_RETRY"
            className="flex-center mt-[30px] gap-2"
            aria-label="테스트 다시하기"
            onClick={() => router.push('/test')}
          >
            <RetryIcon className="h-4 w-4 text-red-500" />
            <span className="text-bold-lg text-red-500">테스트 다시하기</span>
          </Button>
        </div>
      </div>
    </article>
  )
}

export default TasteTypeResult
