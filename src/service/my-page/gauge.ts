import type { TasteScore } from '@/types/gauge-bar/tasteTypes'
import { supabase } from '@/utils/supabase'

type UserAverageScoresRow = {
  user_id: string
  sweetness?: number
  sweetn?: number
  acidity?: number
  acid?: number
  body?: number
  carbonation?: number
  bitterness?: number
  bitter?: number
  aroma?: number
  aro?: number
}

export const getUserAverageScores = async (
  userId: string
): Promise<{ data: TasteScore[] | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase
      .from('user_average_scores')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    if (!data) {
      return { data: null, error: null }
    }

    const row = data as UserAverageScoresRow

    const gaugeData: TasteScore[] = [
      {
        type: 'sweetness_level',
        score: Number(row.sweetness || row.sweetn || 0),
      },
      {
        type: 'acidity_level',
        score: Number(row.acidity || row.acid || 0),
      },
      { type: 'body_level', score: Number(row.body || 0) },
      { type: 'carbonation_level', score: Number(row.carbonation || 0) },
      {
        type: 'bitterness_level',
        score: Number(row.bitter || row.bitterness || 0),
      },
      { type: 'aroma_level', score: Number(row.aroma || row.aro || 0) },
    ]

    return { data: gaugeData, error: null }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    }
  }
}
