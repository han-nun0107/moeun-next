import type { ItemRow } from '@/types/item-row'

import type { FeedbackWithRelations } from './feedback'

export const mapFeedbacksToItemRows = (
  feedbacks: FeedbackWithRelations[]
): ItemRow[] => {
  return feedbacks.map((feedback) => ({
    id: feedback.id,
    type: 'tasting' as const,
    order: feedback.created_at || undefined,
    sweetness: feedback.sweetness,
    acidity: feedback.acidity,
    body: feedback.body,
    carbonation: feedback.carbonation,
    aroma: feedback.aroma,
    bitterness: feedback.bitter,
    confidence: feedback.confidence,
    rating: feedback.rating,
    created_at: feedback.created_at,
    product_name: feedback.product_name || undefined,
    image_url: feedback.image_url || undefined,
    comment: feedback.comment || undefined,
    view_count: feedback.view_count,
    has_image: feedback.image_urls && feedback.image_urls.length > 0,
    product: feedback.product_name
      ? {
          id: String(feedback.product_id),
          name: feedback.product_name,
          main_image_url: feedback.image_url || undefined,
        }
      : undefined,
  }))
}
