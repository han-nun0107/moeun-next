import { useState, useEffect, useRef } from 'react'
import type { DropdownOption } from '@/types/dropdown'

type UseDropdownProps = {
  onSelect?: (option: DropdownOption) => void
}

export function useDropdown({ onSelect }: UseDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<DropdownOption | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleSelect = (option: DropdownOption) => {
    setSelected(option)
    setIsOpen(false)
    onSelect?.(option)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return {
    isOpen,
    setIsOpen,
    selected,
    onSelect: handleSelect,
    dropdownRef,
  }
}
