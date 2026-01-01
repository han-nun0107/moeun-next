import type { ItemRow } from '@/types/item-row'
import type { OrderItemTable, OrderTable } from '@/types/supabase/tables/order'

type OrderItemWithProduct = OrderItemTable['Row'] & {
  product_detail?: {
    id: string
    name: string
    description_image_url: string
  } | null
}

export type OrderWithItems = OrderTable['Row'] & {
  order_items: OrderItemWithProduct[]
}

export const mapOrdersToItemRows = (orders: OrderWithItems[]): ItemRow[] =>
  orders.flatMap((order) =>
    (order.order_items ?? []).map((item) => ({
      id: item.id,
      type: 'order' as const,
      order_date: item.created_at,
      order: order.order_id,
      created_at: item.created_at,

      product: {
        id: item.product_detail?.id || String(item.product_id),
        name: item.order_name || item.product_detail?.name || '',
        main_image_url:
          item.image_url || item.product_detail?.description_image_url || '',
      },

      quantity: item.quantity,
      price: item.price,
      reviewed: item.reviewed,
      feedback_id: item.feedback_id,

      pickup_store: {
        name: item.pickup_store_name || '',
        address: item.pickup_store_address || '',
        contact: item.pickup_store_contact || '',
      },
    }))
  )
