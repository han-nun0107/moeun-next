import { User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LoginState {
  isLoggedIn: boolean
  user: User | null
  setUser: (user: User | null) => void
  login: (user: User) => void
  logout: () => void
  checkSession: () => Promise<void>
}

export const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      setUser: (user) =>
        set({
          user,
          isLoggedIn: !!user,
        }),
      login: (user) =>
        set({
          user,
          isLoggedIn: true,
        }),
      logout: () =>
        set({
          user: null,
          isLoggedIn: false,
        }),
      checkSession: async () => {
        const { supabase } = await import('@/utils/supabase')
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          set({
            user: session.user,
            isLoggedIn: true,
          })
        } else {
          set({
            user: null,
            isLoggedIn: false,
          })
        }
      },
    }),
    {
      name: 'login-storage',
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
      }),
    }
  )
)
