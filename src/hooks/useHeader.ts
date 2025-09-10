import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { ROUTE_PATHS } from '@/constants/routePaths'

export const useHeader = () => {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogout = () => {
    setIsLoggedIn(false)
    router.push(ROUTE_PATHS.HOME)
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    router.push(ROUTE_PATHS.HOME)
  }

  return {
    onLogout: handleLogout,
    onLogin: handleLogin,
    isLoggedIn,
  }
}
