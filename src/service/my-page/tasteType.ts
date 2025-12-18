import { supabase } from '@/utils/supabase'

type TasteTypesRow = {
  type_name: string
  image_url?: string | null
  description?: string | null
}

export type UserTasteTypeResult = {
  tasteType: string
  description?: string[]
  characteristics?: string[]
  imageUrl?: string
}

const normalize = (s: string) => s.trim()

const toStringArray = (text?: string | null): string[] => {
  if (!text) return []
  return text
    .split(/\r?\n|•|\u2022|- /g)
    .map((v) => v.trim())
    .filter(Boolean)
}

export const getUserTasteType = async (
  userId: string
): Promise<{ data: UserTasteTypeResult | null; error: Error | null }> => {
  try {
    const { data: userTypeData, error: userTypeError } = await supabase
      .from('user_average_with_type')
      .select('taste_type')
      .eq('user_id', userId)
      .single()

    if (userTypeError) {
      return { data: null, error: new Error(userTypeError.message) }
    }

    const userTypeRow = userTypeData as { taste_type?: string } | null
    const tasteType = userTypeRow?.taste_type
    if (!tasteType) {
      return { data: null, error: new Error('Taste type not found') }
    }

    const { data: tasteTypes, error: tasteTypesError } = await supabase
      .from('taste_types')
      .select('type_name,image_url,description')

    if (tasteTypesError) {
      return { data: { tasteType }, error: new Error(tasteTypesError.message) }
    }

    const rows = (tasteTypes ?? []) as TasteTypesRow[]

    const matched = rows.find(
      (r) => normalize(r.type_name) === normalize(tasteType)
    )

    if (!matched) {
      return {
        data: { tasteType, description: [], characteristics: [] },
        error: null,
      }
    }

    return {
      data: {
        tasteType,
        imageUrl: matched.image_url ?? undefined,
        description: toStringArray(matched.description),
        characteristics: [],
      },
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    }
  }
}
