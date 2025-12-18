'use client'

import { useQuery } from '@tanstack/react-query'

import { getUserTasteType } from '@/service/my-page'

export const userTasteTypeQueryKey = (userId: string) =>
  ['userTasteType', userId] as const

export function useUserTasteType(userId: string) {
  return useQuery({
    queryKey: userTasteTypeQueryKey(userId),
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await getUserTasteType(userId)
      if (error) throw error
      return data
    },
  })
}
