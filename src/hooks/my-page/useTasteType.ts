'use client'

import { useQuery } from '@tanstack/react-query'

import { getUserTasteType } from '@/service/my-page/tasteType'
import type { UserTasteTypeResult } from '@/service/my-page/tasteType'
import { useLoginStore } from '@/stores/useLoginStore'

export const useTasteType = () => {
  const { user } = useLoginStore()

  const {
    data: tasteTypeData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userTasteType', user?.id],
    queryFn: () => (user?.id ? getUserTasteType(user.id) : null),
    enabled: !!user?.id,
  })

  const tasteType: UserTasteTypeResult | null = tasteTypeData?.data || null

  return {
    tasteType,
    isLoading,
    error,
  }
}

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
