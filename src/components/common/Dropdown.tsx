'use client'

import ArrowIcon from '@/assets/icons/dropdown/arrow.svg'
import Button from '@/components/common/Button'
import { dropdownOptions } from '@/constants'
import useDropdown from '@/hooks/useDropdown'
import type { DropdownProps } from '@/types/dropdown'
import { cn } from '@/utils/cn'

const Dropdown = ({
  placeholder = '편의점 매장을 선택해 주세요.',
  options = dropdownOptions.MY_PAGE,
  onSelect,
  className = '',
}: DropdownProps) => {
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
        onClick={() => setIsOpen((prev: boolean) => !prev)}
      >
        <span className={selected ? 'text-gray-900' : 'text-gray-700'}>
          {selected ? selected.label : placeholder}
        </span>
        <img
          src={ArrowIcon.src}
          alt=""
          width={12}
          height={12}
          className={cn('transition-transform', isOpen && 'rotate-180')}
        />
      </Button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-10 mt-2 w-full rounded-[5px] border border-gray-300 bg-white text-xs text-gray-700 shadow-lg"
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              className="hover:bg-gray-25 cursor-pointer px-4 py-2 first:rounded-t-[5px] last:rounded-b-[5px]"
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

export default Dropdown
