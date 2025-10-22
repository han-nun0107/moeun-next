import { useRouter } from 'next/navigation'

import { ROUTE_PATHS } from '@/constants/routePaths'
import { useLoginStore } from '@/stores/useLoginStore'

export const useHeader = () => {
  const router = useRouter()
  const { isLoggedIn, logout } = useLoginStore()

  const handleLogout = () => {
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
