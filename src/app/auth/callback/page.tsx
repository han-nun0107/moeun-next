'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useLoginStore } from '@/stores/useLoginStore'
import { supabase } from '@/utils/supabase'

export default function AuthCallback() {
  const router = useRouter()
  const { login, checkSession } = useLoginStore()
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    const handleCallback = async () => {
      // URL에서 code 파라미터 직접 파싱
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')

      // 먼저 이미 저장된 세션이 있는지 확인
      const { data: existingSession } = await supabase.auth.getSession()

      if (existingSession.session) {
        console.log('이미 세션이 있습니다. 홈으로 이동합니다.')
        login(existingSession.session.user)
        await checkSession()
        router.replace('/')
        return
      }

      // code가 없으면 로그인 페이지로
      if (!code) {
        console.error('OAuth code가 없습니다. URL:', window.location.href)
        router.replace('/login')
        return
      }

      try {
        // OAuth 코드로 세션 교환
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
          console.error('세션 교환 실패:', error)
          router.replace('/login')
          return
        }

        console.log('세션 교환 성공:', data.session ? '세션 있음' : '세션 없음')

        if (data.session) {
          // 세션이 저장될 때까지 잠시 대기
          await new Promise((resolve) => setTimeout(resolve, 300))

          // 세션 확인 (최대 5번 시도)
          let sessionData = await supabase.auth.getSession()
          let retryCount = 0

          while (!sessionData.data.session && retryCount < 5) {
            await new Promise((resolve) => setTimeout(resolve, 300))
            sessionData = await supabase.auth.getSession()
            retryCount++
            console.log(`세션 확인 시도 ${retryCount}/5`)
          }

          console.log(
            '저장된 세션 확인:',
            sessionData.data.session ? '세션 있음' : '세션 없음'
          )

          if (sessionData.data.session) {
            // 전역 로그인 상태 업데이트
            login(sessionData.data.session.user)
            await checkSession()
            // 세션이 성공적으로 생성되면 홈으로 이동
            router.replace('/')
          } else {
            console.error('세션이 저장되지 않았습니다')
            router.replace('/login')
          }
        } else {
          console.error('세션 데이터가 없습니다')
          router.replace('/login')
        }
      } catch (error) {
        console.error('세션 교환 실패:', error)
        router.replace('/login')
      } finally {
        setIsProcessing(false)
      }
    }

    handleCallback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  if (isProcessing) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>로그인 처리 중...</p>
      </div>
    )
  }

  return null
}
