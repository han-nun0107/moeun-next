import { toZonedTime } from 'date-fns-tz'

const KST_TIMEZONE = 'Asia/Seoul'

export const getCurrentKSTISOString = (): string => {
  const now = new Date()
  const kstDate = toZonedTime(now, KST_TIMEZONE)
  return kstDate.toISOString()
}

export const convertUTCToKST = (
  utcString: string | null | undefined
): string | null => {
  if (!utcString) return null

  try {
    const utcDate = new Date(utcString)
    const kstDate = toZonedTime(utcDate, KST_TIMEZONE)
    return kstDate.toISOString()
  } catch (error) {
    return utcString
  }
}
