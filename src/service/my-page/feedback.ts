import { supabase } from '@/utils/supabase'

export type FeedbackWithRelations = {
  id: number
  user_id: string
  order_item_id: number | null
  product_id: number
  sweetness: number
  acidity: number
  body: number
  carbonation: number
  bitter: number
  aroma: number
  confidence: number
  rating: number
  taste_tag: string[]
  comment: string | null
  image_urls: string[]
  view_count: number
  created_at: string
  updated_at: string
  product_name: string | null
  image_url: string | null
  order_id: number | null
  order_date: string | null
}

export const getMyFeedback = async (
  userId: string
): Promise<{
  data: FeedbackWithRelations[] | null
  error: Error | null
}> => {
  const { data: feedbackData, error: feedbackError } = await supabase
    .from('user_tasting_history')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (feedbackError) {
    return { data: null, error: new Error(feedbackError.message) }
  }

  return {
    data: (feedbackData as FeedbackWithRelations[]) || [],
    error: null,
  }
}
