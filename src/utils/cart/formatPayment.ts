export const formatDate = (dateString: string) =>
  Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format(new Date(dateString))

export const formatAmount = (value: string | number) => {
  if (typeof value === 'number') {
    return `${value.toLocaleString()}원`
  }
  return String(value)
}
