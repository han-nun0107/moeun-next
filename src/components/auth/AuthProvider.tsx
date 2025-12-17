'use client'

import { useEffect } from 'react'

import { useLoginStore } from '@/stores/useLoginStore'
import { supabase } from '@/utils/supabase'
import { syncPendingResponses } from '@/utils/syncPendingResponses'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { checkSession, setUser } = useLoginStore()

  useEffect(() => {
    const initSession = async () => {
      await checkSession()

      const { user } = useLoginStore.getState()
      if (user?.id) {
        await syncPendingResponses(user.id)
      }

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          setUser(session.user)
          await syncPendingResponses(session.user.id)
        } else {
          setUser(null)
        }
      })

      return () => {
        subscription.unsubscribe()
      }
    }

    initSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}
