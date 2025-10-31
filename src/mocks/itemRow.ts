import { ItemRow } from '@/types/item-row'

export const mockOrderData: ItemRow[] = [
  {
    id: 1,
    type: 'order',
    order_date: '2024-10-25',
    product: {
      id: 1,
      main_image_url:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      name: '무선 블루투스 헤드폰',
    },
    quantity: 1,
    price: 89000,
    reviewed: true,
    feedback_id: 101,
  },
  {
    id: 2,
    type: 'order',
    order_date: '2024-10-28',
    product: {
      id: 2,
      main_image_url:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      name: '프리미엄 손목시계',
    },
    quantity: 1,
    price: 250000,
    reviewed: false,
    feedback_id: null,
  },
  {
    id: 3,
    type: 'order',
    order_date: '2024-10-29',
    product: {
      id: 3,
      main_image_url:
        'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400',
      name: '캔버스 백팩',
    },
    quantity: 2,
    price: 65000,
    reviewed: true,
    feedback_id: 102,
  },
  {
    id: 4,
    type: 'order',
    order_date: '2024-10-30',
    product: {
      id: 4,
      main_image_url:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
      name: '선글라스',
    },
    quantity: 1,
    price: 120000,
    reviewed: false,
    feedback_id: null,
  },
  {
    id: 5,
    type: 'order',
    order_date: '2024-10-31',
    product: {
      id: 5,
      main_image_url:
        'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400',
      name: '운동화',
    },
    quantity: 1,
    price: 95000,
    reviewed: true,
    feedback_id: 103,
  },
]

export const mockTastingData: ItemRow[] = [
  {
    id: 1,
    type: 'tasting',
    image_url:
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400',
    product_name: '토스카나 키안티 클라시코 2020',
    created_at: '2025-09-14T18:32:00Z',
    comment: '드라이하면서도 향이 부드럽고 밸런스가 좋았어요.',
    sweetness: 2,
    acidity: 4,
    body: 3,
    carbonation: 1,
    aroma: 5,
    bitterness: 3,
    confidence: 90,
  },
  {
    id: 2,
    type: 'tasting',
    image_url:
      'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400',
    product_name: '바롤로 DOCG 리제르바 2018',
    created_at: '2025-08-22T20:11:00Z',
    comment: '묵직하고 향이 깊음. 스테이크와 환상 궁합.',
    sweetness: 1,
    acidity: 3,
    body: 5,
    carbonation: 0,
    aroma: 5,
    bitterness: 4,
    confidence: 85,
  },
  {
    id: 3,
    type: 'tasting',
    image_url:
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400',
    product_name: '프로세코 엑스트라 드라이 DOC',
    created_at: '2025-07-30T15:42:00Z',
    comment: '탄산감이 상쾌하고 여름에 마시기 좋았어요.',
    sweetness: 4,
    acidity: 3,
    body: 2,
    carbonation: 5,
    aroma: 3,
    bitterness: 1,
    confidence: 80,
  },
  {
    id: 4,
    type: 'tasting',
    image_url:
      'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400',
    product_name: '몬테풀치아노 다브루초 2019',
    created_at: '2025-06-08T19:15:00Z',
    comment: '과일향이 풍부하고 여운이 길었음.',
    sweetness: 3,
    acidity: 3,
    body: 4,
    carbonation: 1,
    aroma: 4,
    bitterness: 2,
    confidence: 88,
  },
  {
    id: 5,
    type: 'tasting',
    image_url:
      'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400',
    product_name: '로제 꼬뜨 드 프로방스 2021',
    created_at: '2025-05-02T12:28:00Z',
    comment: '부드럽고 달콤한 향이 인상적. 디저트 와인으로 좋음.',
    sweetness: 5,
    acidity: 2,
    body: 2,
    carbonation: 2,
    aroma: 4,
    bitterness: 1,
    confidence: 92,
  },
]
