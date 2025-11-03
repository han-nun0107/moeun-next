import { CartMockItem } from '@/types/cart/cart'

export const mockCartData: CartMockItem[] = [
  {
    id: 1,
    detailId: 101,
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    name: '무선 블루투스 헤드폰 프리미엄',
    quantity: 2,
    price: '89000',
    subtotal: '178000',
    pickupName: '강남 본점',
    pickupAddress: '서울시 강남구 테헤란로 123',
    pickupContact: '02-1234-5678',
    checked: true,
    product: {
      id: 101,
      name: '무선 블루투스 헤드폰 프리미엄',
      main_image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    },
    pickup_store: {
      name: '강남 본점',
      address: '서울시 강남구 테헤란로 123',
      contact: '02-1234-5678',
    },
  },
  {
    id: 2,
    detailId: 102,
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    name: '스마트워치 시리즈 5',
    quantity: 1,
    price: '320000',
    subtotal: '320000',
    pickupName: '홍대 지점',
    pickupAddress: '서울시 마포구 홍익로 45',
    pickupContact: '02-2345-6789',
    checked: true,
    product: {
      id: 102,
      name: '스마트워치 시리즈 5',
      main_image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    },
    pickup_store: {
      name: '홍대 지점',
      address: '서울시 마포구 홍익로 45',
      contact: '02-2345-6789',
    },
  },
  {
    id: 3,
    detailId: 103,
    img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
    name: '프리미엄 선글라스 UV 차단',
    quantity: 3,
    price: '150000',
    subtotal: '450000',
    pickupName: '신촌 매장',
    pickupAddress: '서울시 서대문구 신촌로 78',
    pickupContact: '02-3456-7890',
    checked: false,
    product: {
      id: 103,
      name: '프리미엄 선글라스 UV 차단',
      main_image:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
    },
    pickup_store: {
      name: '신촌 매장',
      address: '서울시 서대문구 신촌로 78',
      contact: '02-3456-7890',
    },
  },
  {
    id: 4,
    detailId: 104,
    img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400',
    name: '캔버스 스니커즈 화이트',
    quantity: 1,
    price: '65000',
    subtotal: '65000',
    pickupName: '잠실 스토어',
    pickupAddress: '서울시 송파구 올림픽로 240',
    pickupContact: '02-4567-8901',
    checked: true,
    product: {
      id: 104,
      name: '캔버스 스니커즈 화이트',
      main_image:
        'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400',
    },
    pickup_store: {
      name: '잠실 스토어',
      address: '서울시 송파구 올림픽로 240',
      contact: '02-4567-8901',
    },
  },
  {
    id: 5,
    detailId: 105,
    img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400',
    name: '미니멀 백팩 15.6인치',
    quantity: 2,
    price: '89000',
    subtotal: '178000',
    pickupName: '여의도 지점',
    pickupAddress: '서울시 영등포구 여의대로 108',
    pickupContact: '02-5678-9012',
    checked: false,
    product: {
      id: 105,
      name: '미니멀 백팩 15.6인치',
      main_image:
        'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400',
    },
    pickup_store: {
      name: '여의도 지점',
      address: '서울시 영등포구 여의대로 108',
      contact: '02-5678-9012',
    },
  },
]

// 페이지에서 바로 사용할 수 있도록, cart 페이지 구조에 맞춘 응답도 제공
export const mockCartResponse = (() => {
  const cart_items = mockCartData.map((item) => ({
    id: item.id,
    product: {
      id: String(item.detailId),
      name: item.name,
      price: parseFloat(item.price),
      main_image: item.img,
    },
    quantity: item.quantity,
    subtotal: item.subtotal,
    pickup_store: {
      id: item.id,
      name: item.pickupName,
      address: item.pickupAddress,
      contact: item.pickupContact,
    },
    pickup_date: new Date().toISOString(),
    type: 'cart' as const,
  }))

  const total = cart_items.reduce(
    (acc: number, ci) => acc + parseFloat(ci.subtotal || '0'),
    0
  )

  return {
    cart_items,
    results: cart_items,
    count: cart_items.length,
    next: null as null,
    previous: null as null,
    total_price: total,
    final_total: total,
  }
})()
