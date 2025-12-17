import { Database } from '@/types/supabase'
import { supabase } from '@/utils/supabase'

type UserResponseRow = Database['public']['Tables']['user_responses']['Row']
type UserResponseInsert =
  Database['public']['Tables']['user_responses']['Insert']

export interface UserResponseData {
  question_id: number
  selected_option: 'A' | 'B'
  score_value: number
}

export const saveUserResponses = async (
  userId: string,
  responses: UserResponseData[]
): Promise<{ data: UserResponseRow[] | null; error: Error | null }> => {
  try {
    const insertData: UserResponseInsert[] = responses.map((response) => ({
      user_id: userId,
      question_id: response.question_id,
      selected_option: response.selected_option,
      score_value: response.score_value,
    }))

    const table = supabase.from('user_responses')
    const { data, error } = await (
      table as unknown as {
        insert: (values: UserResponseInsert[]) => {
          select: () => Promise<{
            data: UserResponseRow[] | null
            error: unknown
          }>
        }
      }
    )
      .insert(insertData)
      .select()

    if (error) {
      return { data: null, error: error as Error }
    }

    return { data: data as UserResponseRow[], error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}
