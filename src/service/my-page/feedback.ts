import type { Review } from '@/types/review'
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
  user_name?: string | null
}

const fetchFeedbackData = async (
  userId?: string
): Promise<{
  data: FeedbackWithRelations[] | null
  error: Error | null
}> => {
  let feedbackQuery = supabase
    .from('feedback')
    .select(
      `*,
      order_item:order_item_id (
        order_id,
        order_name
      )`
    )
    .order('created_at', { ascending: false })

  if (userId) {
    feedbackQuery = feedbackQuery.eq('user_id', userId)
  }

  const { data: feedbackData, error: feedbackError } = await feedbackQuery

  if (feedbackError) {
    return { data: null, error: new Error(feedbackError.message) }
  }

  let historyQuery = supabase
    .from('user_tasting_history')
    .select('id, image_url')

  if (userId) {
    historyQuery = historyQuery.eq('user_id', userId)
  }

  const { data: historyData, error: historyError } = await historyQuery

  if (historyError) {
    return { data: null, error: new Error(historyError.message) }
  }

  type HistoryItem = {
    id: number
    image_url: string | null
  }
  const imageMap = new Map(
    ((historyData || []) as HistoryItem[]).map((item) => [
      item.id,
      item.image_url,
    ])
  )

  type FeedbackWithOrderItem = {
    overall_rating?: number
    rating?: number
    order_item?: {
      order_id: number
      order_name: string | null
    } | null
  } & Omit<
    FeedbackWithRelations,
    'rating' | 'order_id' | 'image_url' | 'product_name'
  >

  const mappedData = ((feedbackData || []) as FeedbackWithOrderItem[]).map(
    (item) => ({
      ...item,
      rating: item.overall_rating || item.rating || 0,
      order_id: item.order_item?.order_id || null,
      image_url: imageMap.get(item.id) || null,
      product_name: item.order_item?.order_name || null,
      order_date: null,
    })
  )

  return {
    data: (mappedData as FeedbackWithRelations[]) || [],
    error: null,
  }
}

export const getMyFeedback = async (
  userId: string
): Promise<{
  data: FeedbackWithRelations[] | null
  error: Error | null
}> => {
  return fetchFeedbackData(userId)
}

export const getAllFeedback = async (): Promise<{
  data: FeedbackWithRelations[] | null
  error: Error | null
}> => {
  return fetchFeedbackData()
}

export const mapFeedbackToReview = (
  feedback: FeedbackWithRelations
): Review => {
  return {
    id: feedback.id,
    image: feedback.image_urls?.[0] || feedback.image_url || '',
    alt: feedback.product_name || '상품 이미지',
    rating: feedback.rating,
    desc: feedback.comment || '',
    nickname: feedback.user_name || '익명',
    createdAt: feedback.created_at,
    product_id: feedback.product_id,
    product_name: feedback.product_name || undefined,
    user_id: feedback.user_id,
  }
}
