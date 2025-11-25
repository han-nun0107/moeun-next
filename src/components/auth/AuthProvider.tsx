'use client'

import { useEffect } from 'react'

import { useLoginStore } from '@/stores/useLoginStore'
import { supabase } from '@/utils/supabase'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { checkSession, setUser } = useLoginStore()

  useEffect(() => {
    // 초기 세션 확인
    const initSession = async () => {
      await checkSession()

      // Supabase auth state 변경 감지
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser(session.user)
        } else {
          setUser(null)
        }
      })

      return () => {
        subscription.unsubscribe()
      }
    }

    initSession()
  }, [checkSession, setUser])

  return <>{children}</>
}

