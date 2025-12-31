'use client'

import { useQuery } from '@tanstack/react-query'

import {
  getMyFeedback,
  type FeedbackWithRelations,
  mapFeedbacksToItemRows,
} from '@/service/my-page'
import type { ItemRow } from '@/types/item-row'

export const useHistory = (userId?: string) => {
  const { data, isLoading, error } = useQuery<
    FeedbackWithRelations[],
    Error,
    ItemRow[]
  >({
    queryKey: ['myFeedback', userId],
    queryFn: async () => {
      if (!userId) {
        return []
      }
      const result = await getMyFeedback(userId)
      if (result.error) {
        throw result.error
      }
      return result.data ?? []
    },
    enabled: !!userId,
    select: (feedbacks) => mapFeedbacksToItemRows(feedbacks),
  })

  return {
    data: data as ItemRow[] | undefined,
    isLoading,
    error,
  }
}
