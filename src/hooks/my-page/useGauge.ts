'use client'

import { useQuery } from '@tanstack/react-query'
import { useState, useMemo } from 'react'

import { MY_PAGE } from '@/constants/my-page/myPage'
import { getUserAverageScores } from '@/service/my-page'
import { useLoginStore } from '@/stores/useLoginStore'

export const useGauge = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { user } = useLoginStore()

  const {
    data: gaugeData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userAverageScores', user?.id],
    queryFn: () => getUserAverageScores(user!.id),
    enabled: !!user?.id,
  })

  const displayedGauges = useMemo(() => {
    const gauges = gaugeData?.data || MY_PAGE.GAUGE_VALUES
    return isExpanded ? gauges : gauges.slice(0, 3)
  }, [gaugeData?.data, isExpanded])

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
