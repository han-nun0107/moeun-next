import type { Metadata } from 'next'

import { Card } from '@/components'
import RECOMMENDED from '@/mocks/main/recommended'

export const metadata: Metadata = {
  title: '찜한 상품 | 모은',
  description: '회원님이 찜한 상품 목록을 확인하세요.',
  keywords: ['찜한상품', '좋아요', '위시리스트', '쇼핑몰'],
  openGraph: {
    title: '찜한 상품 | 모은',
    description: '회원님이 찜한 상품 목록을 확인하세요.',
    url: 'https://example.com/like',
    siteName: '모은',
    locale: 'ko_KR',
    type: 'website',
    images: ['/og-like.jpg'],
  },
}

const LikePage = () => {
  return (
    <section className="mx-auto my-25 w-full max-w-320">
      <article className="flex h-full flex-col gap-16">
        <h1 className="border-b-2 border-[#000] pb-5 text-2xl font-bold text-[#333]">
          찜한 상품
        </h1>
        <div className="mx-auto grid grid-cols-4 gap-7">
          {RECOMMENDED.map((item) => (
            <Card key={item.id} type="product" data={item} />
          ))}
        </div>
      </article>
    </section>
  )
}

export default LikePage
