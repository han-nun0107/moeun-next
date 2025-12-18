'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button, RetryIcon } from '@/components'
import { useTasteType, useUserTasteType } from '@/hooks/my-page/useTasteType'
import { useLoginStore } from '@/stores/useLoginStore'
import { getUsername } from '@/utils/getUsername'

const TasteTypeResult = () => {
  const router = useRouter()
  const { user } = useLoginStore()
  const username = getUsername(user)
  const { tasteType } = useTasteType()
  const { data: tasteTypeData } = useUserTasteType(user?.id || '')
  const mainData = tasteTypeData?.data
  const tasteTypeName = tasteType?.tasteType || '깔끔고소'

  return (
    <article className="flex-center flex-col">
      <div className="mt-[22px] h-93 w-315 bg-red-500">
        <p className="text-bold-lg flex-center circle-border border-white-100 text-white-100 absolute mt-5 ml-5 h-10 w-35">
          나의 취향 유형
        </p>
        <div className="flex-center h-full flex-col gap-[10px]">
          <div className="flex-center h-20 w-20 rounded-full bg-red-600">
            <Image
              src={mainData?.imageUrl || ''}
              alt="테스트 결과 이미지"
              width={60}
              height={53}
            />
          </div>
          <h1 className="text-white-100 mt-4 text-2xl font-bold">
            {username}님 취향 유형은 &apos;{tasteTypeName}&apos; 유형입니다
          </h1>
          <p className="text-white-100 text-lg font-normal">
            {mainData?.description?.join(' ')}
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
