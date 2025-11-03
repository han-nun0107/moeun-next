import { useState } from 'react'


type UseEditPageProps = {
  openAlarmModal: () => void
}

export const useEditPage = ({ openAlarmModal }: UseEditPageProps) => {
  const [selected, setSelected] = useState('비동의')
  
  const handleMarketingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value)
    if (e.target.value === '동의') {
      openAlarmModal()
    }
  }

  return {
    selected,
    handleMarketingChange,
  }
}
