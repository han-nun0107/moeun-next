import { useState } from 'react'

import { useEditPageModals } from './useEditPageModals'

export const useEditPage = () => {
  const [selected, setSelected] = useState('비동의')
  const { alarmModal } = useEditPageModals()

  const handleMarketingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value)
    if (e.target.value === '동의') {
      alarmModal.open()
    }
  }

  return {
    selected,
    handleMarketingChange,
  }
}
