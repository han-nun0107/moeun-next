

import { useState } from 'react'

import { MY_PAGE } from '@/constants/my-page/myPage'

export const useGauge = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const displayedGauges = isExpanded ? MY_PAGE.GAUGE_VALUES : MY_PAGE.GAUGE_VALUES.slice(0, 3)

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev)
  }

  return {
    isExpanded,
    displayedGauges,
    toggleExpand,
  }
}
