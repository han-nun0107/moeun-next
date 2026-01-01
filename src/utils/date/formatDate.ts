export const formatDateTime = (
  dateString: string | null | undefined
): string => {
  if (!dateString) return ''

  try {
    return `${dateString.slice(0, 10)} ${dateString.slice(11, 16)}`
  } catch (error) {
    return ''
  }
}
