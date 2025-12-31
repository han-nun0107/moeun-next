import { QueryClient } from '@tanstack/react-query'

import { DB_TABLES } from '@/constants/supabase-db/dbTables'
import type { TastingSubmitData } from '@/types/modal/feedback'
import { supabase } from '@/utils/supabase'

export const orderReviewSubmit = ({
  queryClient,
  resetForm,
  onClose,
  submitData,
  userId,
}: {
  queryClient: QueryClient
  resetForm: () => void
  onClose?: () => void
  submitData: TastingSubmitData
  userId?: string
}) => {
  return {
    mutationFn: async (itemId: number) => {
      if (!userId) {
        throw new Error('로그인이 필요합니다.')
      }

      // order_item에서 product_id 가져오기
      const { data: orderItem, error: orderItemError } = await (supabase
        .from(DB_TABLES.ORDER_ITEMS)
        .select('product_id')
        .eq('id', itemId)
        .single() as unknown as Promise<{
        data: { product_id: number } | null
        error: { message: string } | null
      }>)

      if (orderItemError || !orderItem) {
        throw new Error('주문 항목을 찾을 수 없습니다.')
      }

      // feedback 테이블에 데이터 저장
      const { data: feedbackData, error: feedbackError } = await (supabase
        .from('feedback')
        .insert({
          user_id: userId,
          order_item_id: itemId,
          product_id: orderItem.product_id,
          sweetness: submitData.sweetness,
          acidity: submitData.acidity,
          body: submitData.body,
          carbonation: submitData.carbonation,
          bitter: submitData.bitter,
          aroma: submitData.aroma,
          confidence: submitData.confidence,
          overall_rating: submitData.overall_rating,
          taste_tag: submitData.taste_tag,
          comment: submitData.comment || null,
          image_urls: [], // TODO: 이미지 업로드 후 URL 배열로 저장
        } as never)
        .select()
        .single() as unknown as Promise<{
        data: { id: number } | null
        error: { message: string } | null
      }>)

      if (feedbackError || !feedbackData) {
        throw new Error(feedbackError?.message || '리뷰 저장에 실패했습니다.')
      }

      // order_items의 reviewed와 feedback_id 업데이트
      const { error: updateError } = await (supabase
        .from(DB_TABLES.ORDER_ITEMS)
        .update({
          reviewed: true,
          feedback_id: feedbackData.id,
        } as never)
        .eq('id', itemId) as unknown as Promise<{
        error: { message: string } | null
      }>)

      if (updateError) {
        throw new Error(
          updateError.message || '주문 항목 업데이트에 실패했습니다.'
        )
      }

      return feedbackData
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['tasting-history'] })
      resetForm()
      onClose?.()
      alert('리뷰가 제출되었습니다.')
    },
    onError: (error: Error) => {
      alert(error.message || '리뷰 제출에 실패했습니다. 다시 시도해주세요.')
    },
  }
}
