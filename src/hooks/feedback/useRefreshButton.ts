import { useState } from 'react'

export const useRefreshButton = () => {
  const [rotationKey, setRotationKey] = useState(0)

  const handleRefresh = () => {
    setRotationKey((prev) => prev + 1)
  }

  return {
    rotationKey,
    handleRefresh,
  }
}
