export const getCurrentKSTISOString = (): string => {
  const now = new Date()
  const kstOffset = 9 * 60 * 60 * 1000
  const kstTime = new Date(now.getTime() + kstOffset)
  return kstTime.toISOString()
}

export const convertUTCToKST = (
  utcString: string | null | undefined
): string | null => {
  if (!utcString) return null

  try {
    const utcDate = new Date(utcString)
    const kstOffset = 9 * 60 * 60 * 1000
    const kstTime = new Date(utcDate.getTime() + kstOffset)
    return kstTime.toISOString()
  } catch (error) {
    return utcString
  }
}
