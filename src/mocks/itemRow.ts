import { ItemRow } from '@/types/item-row'

export const mockOrderData: ItemRow[] = [
  {
    id: 1,
    type: 'order',
    order_date: '2024-10-25',
    product: {
      main_image_url:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      name: '무선 블루투스 헤드폰',
    },
    quantity: 1,
    price: '89000',
    reviewed: true,
    feedback_id: 101,
  },
  {
    id: 2,
    type: 'order',
    order_date: '2024-10-28',
    product: {
      main_image_url:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      name: '프리미엄 손목시계',
    },
    quantity: 1,
    price: '250000',
    reviewed: false,
    feedback_id: null,
  },
  {
    id: 3,
    type: 'order',
    order_date: '2024-10-29',
    product: {
      main_image_url:
        'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400',
      name: '캔버스 백팩',
    },
    quantity: 2,
    price: '65000',
    reviewed: true,
    feedback_id: 102,
  },
  {
    id: 4,
    type: 'order',
    order_date: '2024-10-30',
    product: {
      main_image_url:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
      name: '선글라스',
    },
    quantity: 1,
    price: '120000',
    reviewed: false,
    feedback_id: null,
  },
  {
    id: 5,
    type: 'order',
    order_date: '2024-10-31',
    product: {
      main_image_url:
        'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400',
      name: '운동화',
    },
    quantity: 1,
    price: '95000',
    reviewed: true,
    feedback_id: 103,
  },
]
