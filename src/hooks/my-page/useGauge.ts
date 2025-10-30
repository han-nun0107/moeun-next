

import { useState } from 'react'

import { GAUGE_VALUES } from '@/constants/my-page/gauge'

export const useGauge = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const displayedGauges = isExpanded ? GAUGE_VALUES : GAUGE_VALUES.slice(0, 3)

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev)
  }

  return {
    isExpanded,
    displayedGauges,
    toggleExpand,
  }
}
