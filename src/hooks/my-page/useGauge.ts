'use client'

import { useQuery } from '@tanstack/react-query'
import { useState, useMemo } from 'react'

import { MY_PAGE } from '@/constants/my-page/myPage'
import { getUserAverageScores } from '@/service/my-page'
import { useLoginStore } from '@/stores/useLoginStore'
import type { TasteScore } from '@/types/gauge-bar/tasteTypes'

export const useGauge = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { user } = useLoginStore()

  const {
    data: gaugeData,
    isLoading,
    error,
  } = useQuery<TasteScore[] | null, Error>({
    queryKey: ['userAverageScores', user?.id],
    queryFn: async () => {
      if (!user?.id) {
        return null
      }
      const result = await getUserAverageScores(user.id)
      if (result.error) {
        throw result.error
      }
      return result.data
    },
    enabled: !!user?.id,
  })

  const displayedGauges = useMemo(() => {
    const gauges = gaugeData || MY_PAGE.GAUGE_VALUES
    return isExpanded ? gauges : gauges.slice(0, 3)
  }, [gaugeData, isExpanded])

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev)
  }

  return {
    isExpanded,
    displayedGauges,
    toggleExpand,
    isLoading,
    error,
  }
}
