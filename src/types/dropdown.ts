export type DropdownOption = {
  label: string
  value: string
}

export type DropdownProps = {
  placeholder?: string
  options?: DropdownOption[]
  onSelect?: (option: DropdownOption) => void
  className?: string
}
