'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useLoginStore } from '@/stores/useLoginStore'
import { supabase } from '@/utils/supabase'
import { syncPendingResponses } from '@/utils/syncPendingResponses'

export default function AuthCallback() {
  const router = useRouter()
  const { login, checkSession } = useLoginStore()
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')

      const { data: existingSession } = await supabase.auth.getSession()

      if (existingSession.session) {
        console.log('이미 세션이 있습니다. 홈으로 이동합니다.')
        login(existingSession.session.user)
        await checkSession()
        await syncPendingResponses(existingSession.session.user.id)
        router.replace('/')
        return
      }

      if (!code) {
        console.error('OAuth code가 없습니다. URL:', window.location.href)
        router.replace('/login')
        return
      }

      try {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
          console.error('세션 교환 실패:', error)
          router.replace('/login')
          return
        }

        console.log('세션 교환 성공:', data.session ? '세션 있음' : '세션 없음')

        if (data.session) {
          await new Promise((resolve) => setTimeout(resolve, 300))

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
            login(sessionData.data.session.user)
            await checkSession()
            await syncPendingResponses(sessionData.data.session.user.id)
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
