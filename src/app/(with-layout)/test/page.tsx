import type { Metadata } from 'next'

import { TestClient } from '@/components'

export const metadata: Metadata = {
  title: '내 입맛에 맞는 전통주 테스트 | 전통주 취향 테스트',
  description:
    '나는 어떤 입맛일까? 전통주 취향 테스트를 통해 나만의 전통주를 찾아보세요.',
  openGraph: {
    title: '내 입맛에 맞는 전통주 테스트',
    description: '전통주 취향 테스트로 나만의 주류 스타일을 알아보세요.',
    images: ['/images/test/main.png'], // IMAGE_URLS 대신 정적 경로 권장
    type: 'website',
  },
  alternates: {
    canonical: 'https://example.com/test',
  },
}

export default function TestPage() {
  return <TestClient />
}
