import type { ItemRowType } from '@/types/itemRows'

export const cartItems: ItemRowType[] = [
  {
    id: 1,
    type: 'cart',
    img: 'https://via.placeholder.com/150',
    name: '달콤한 사과주',
    quantity: 2,
    price: 15000,
    pickupName: '강남점',
    product: {
      id: 'p1',
      name: '달콤한 사과주',
      price: '15000',
      main_image_url: 'https://via.placeholder.com/150',
    },
    subtotal: '30000',
  },
  {
    id: 2,
    type: 'cart',
    img: 'https://via.placeholder.com/150',
    name: '새콤한 자두주',
    quantity: 1,
    price: 18000,
    pickupName: '홍대점',
    package: {
      id: 101,
      name: '여름 과일주 세트',
      price: '50000',
      items: [
        { id: 'p2', name: '새콤한 자두주' },
        { id: 'p3', name: '시원한 수박주' },
      ],
    },
    subtotal: '18000',
  },
]

export const orderItems: ItemRowType[] = [
  {
    id: 101,
    type: 'order',
    img: 'https://via.placeholder.com/150',
    name: '클래식 막걸리',
    quantity: 3,
    price: 12000,
    order_date: '2023-10-26',
    reviewed: false,
    feedback_id: null,
    product: {
      id: 'p101',
      name: '클래식 막걸리',
      price: 12000,
      main_image_url: 'https://via.placeholder.com/150',
    },
    pickup_store: {
      name: '인사동점',
      address: '서울시 종로구 인사동길 12',
      contact: '02-123-4567',
    },
  },
  {
    id: 102,
    type: 'order',
    img: 'https://via.placeholder.com/150',
    name: '프리미엄 증류주',
    quantity: 1,
    price: 55000,
    order_date: '2023-10-25',
    reviewed: true,
    feedback_id: 1001,
    product: {
      id: 'p102',
      name: '프리미엄 증류주',
      price: 55000,
      main_image_url: 'https://via.placeholder.com/150',
    },
    pickup_store: {
      name: '부산 서면점',
      address: '부산시 부산진구 중앙대로 694',
      contact: '051-987-6543',
    },
  },
]

export const tastingItems: ItemRowType[] = [
  {
    id: 201,
    type: 'tasting',
    img: 'https://via.placeholder.com/150',
    name: '유자향 탁주',
    created_at: '2023-09-15T14:30:00Z',
    rating: 4.5,
    sweetness: 'medium',
    acidity: 'low',
    body: 'full',
    carbonation: 'strong',
    aroma: 'citrus',
    bitterness: 'low',
    comment:
      '유자향이 은은하게 나서 좋았어요. 탄산감이 강해서 청량감이 느껴집니다.',
    product: {
      id: 'p4',
      name: '유자향 탁주',
    },
  },
  {
    id: 202,
    type: 'tasting',
    img: 'https://via.placeholder.com/150',
    name: '밤맛 동동주',
    created_at: '2023-08-20T18:00:00Z',
    rating: 5,
    sweetness: 'high',
    acidity: 'low',
    body: 'medium',
    carbonation: 'low',
    aroma: 'nutty',
    bitterness: 'none',
    comment: '정말 밤맛이 나네요! 고소하고 달달해서 맛있게 마셨습니다.',
    product: {
      id: 'p5',
      name: '밤맛 동동주',
    },
  },
]
