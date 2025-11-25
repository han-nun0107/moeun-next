import { useRouter } from 'next/navigation'

import { ROUTE_PATHS } from '@/constants/routePaths'
import { useLoginStore } from '@/stores/useLoginStore'
import { supabase } from '@/utils/supabase'

export const useHeader = () => {
  const router = useRouter()
  const { isLoggedIn, logout } = useLoginStore()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    logout()
    router.push(ROUTE_PATHS.HOME)
  }

  const handleLogin = () => {
    router.push(ROUTE_PATHS.LOGIN)
  }

  return {
    onLogout: handleLogout,
    onLogin: handleLogin,
    isLoggedIn,
  }
}
