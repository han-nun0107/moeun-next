import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import Header from '@/components/layout/Header'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '한잔취향 | 전통주 취향 맞춤 추천',
  description:
    '내 취향에 꼭 맞는 전통주를 발견하세요. 다양한 막걸리, 소주, 청주를 맛보고 기록하며 나만의 주류 취향을 만들어갑니다.',
  openGraph: {
    title: '한잔취향 | 전통주 취향 맞춤 추천',
    description:
      '내 취향에 꼭 맞는 전통주를 발견하세요. 시음 기록과 리뷰를 통해 나만의 술 취향을 찾아보세요.',
    /* TODO: 수정 */
    url: 'https://mock.com',
    siteName: '한잔취향',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '한잔취향 로고 및 전통주 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '한잔취향 | 전통주 취향 맞춤 추천',
    description: '취향 기반 전통주 추천 & 기록 서비스',
    /* TODO: 수정 */
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  )
}
