'use client'

import { cn } from '@/utils/cn'
import Image from 'next/image'
import ArrowIcon from '@/assets/icons/dropdown/arrow.svg'
import Button from '@/components/common/Button'

import { DropdownProps } from '@/types/dropdown'
import { useDropdown } from '@/hooks/useDropdown'
import { dropdownOptions } from '@/constants/dropdown/dropdown'

export default function Dropdown({
  placeholder = '편의점 매장을 선택해 주세요.',
  options = dropdownOptions,
  onSelect,
  className = '',
}: DropdownProps) {
  const {
    isOpen,
    selected,
    onSelect: handleSelect,
    setIsOpen,
    dropdownRef,
  } = useDropdown({
    onSelect,
  })

  return (
    <div
      ref={dropdownRef}
      className={cn('relative inline-block h-8 w-116', className)}
    >
      <Button
        variant="DROPDOWN"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={selected ? 'text-gray-900' : 'text-[#666]'}>
          {selected ? selected.label : placeholder}
        </span>
        <Image
          src={ArrowIcon}
          alt="arrow"
          width={12}
          height={12}
          className={cn('transition-transform', isOpen && 'rotate-180')}
        />
      </Button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-10 mt-2 w-full rounded-[5px] border border-[#d9d9d9] bg-white text-xs text-[#666] shadow-lg"
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              className="cursor-pointer px-4 py-2 first:rounded-t-[5px] last:rounded-b-[5px] hover:bg-[#f5f5f5]"
              aria-selected={selected?.value === option.value}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
