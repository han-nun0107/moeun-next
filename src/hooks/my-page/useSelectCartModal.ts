'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { DropdownOption } from '@/types/dropdown'

export const useSelectCartModal = () => {
  const router = useRouter()

  const [selectedRegion, setSelectedRegion] = useState<DropdownOption | null>(
    null
  )
  const [pickupDate, setPickupDate] = useState('')

  const handleSubmit = () => {
    console.log('선택된 지역:', selectedRegion)
    console.log('선택된 날짜:', pickupDate)
  }

  const handleClick = (type: 'CART' | 'CONTINUE') => {
    if (!selectedRegion || !pickupDate) {
      alert('주문 지역과 픽업 날짜를 모두 선택해주세요.')
      return
    }

    handleSubmit()
    if (type === 'CART') {
      router.push('/cart')
    } else {
      router.push('/')
    }
  }

  return {
    setSelectedRegion,
    pickupDate,
    setPickupDate,
    handleClick,
  }
}
