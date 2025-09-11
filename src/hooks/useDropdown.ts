import { useState } from 'react'

import { DropdownOption } from '@/types/dropdown'

export const useDropdown = ({
  onSelect,
}: {
  onSelect?: (option: DropdownOption) => void
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<DropdownOption | null>(null)

  const handleSelect = (option: DropdownOption) => {
    setSelected(option)
    setIsOpen(false)
    onSelect?.(option)
  }

  return {
    isOpen,
    selected,
    onSelect: handleSelect,
    setIsOpen,
    setSelected,
  }
}
