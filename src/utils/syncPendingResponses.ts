import { LOCAL_STORAGE_KEYS } from '@/constants/test/localStorage'
import {
  saveUserResponses,
  UserResponseData,
} from '@/service/test/userResponses'

export const syncPendingResponses = async (
  userId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const pendingData = localStorage.getItem(
      LOCAL_STORAGE_KEYS.PENDING_RESPONSES
    )

    if (!pendingData) {
      return { success: true }
    }

    const responses: UserResponseData[] = JSON.parse(pendingData)

    if (!Array.isArray(responses) || responses.length === 0) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.PENDING_RESPONSES)
      return { success: true }
    }

    const { error } = await saveUserResponses(userId, responses)

    if (error) {
      // eslint-disable-next-line no-console
      console.error('대기 중인 응답 동기화 실패:', error)
      return { success: false, error: error.message }
    }

    localStorage.removeItem(LOCAL_STORAGE_KEYS.PENDING_RESPONSES)
    return { success: true }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('대기 중인 응답 동기화 중 오류:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    }
  }
}
