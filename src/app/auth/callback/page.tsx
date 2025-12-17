'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { supabase } from '@/utils/supabase'

export default function AuthCallback() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')

      const { data: existingSession } = await supabase.auth.getSession()
      if (existingSession.session) {
        router.replace('/')
        setIsProcessing(false)
        return
      }

      if (!code) {
        router.replace('/login')
        setIsProcessing(false)
        return
      }

      try {
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
          router.replace('/login')
          return
        }

        router.replace('/')
      } catch (error) {
        router.replace('/login')
      } finally {
        setIsProcessing(false)
      }
    }

    handleCallback()
  }, [])

  if (isProcessing) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>로그인 처리 중...</p>
      </div>
    )
  }

  return null
}
