import { IMAGE_URLS } from '@/constants'

type ResultProduct = {
  id: number
  img: string
  name: string
  alt: string
  description: string
  tags: string[]
}

type TestBottomButton = {
  id: number
  label: string
  href: string
}

export const mockResultProductData: ResultProduct[] = [
  {
    id: 1,
    img: IMAGE_URLS.Test.Hansan,
    name: '한산 소곡주',
    alt: '한산 소곡주 이미지',
    description: '한산양조장',
    tags: ['부드러운', '곡물향'],
  },
  {
    id: 2,
    img: IMAGE_URLS.Test.Solsongju,
    name: '솔송주 40% 와당 도자기',
    alt: '솔송주 40% 와당 도자기 이미지',
    description: '솔송주양조장',
    tags: ['은은한 단맛', '고소한'],
  },
  {
    id: 3,
    img: IMAGE_URLS.Test.Jeonju,
    name: '전주 이강주',
    alt: '전주 이강주 이미지',
    description: '전주양조장',
    tags: ['달콤한향', '고소한'],
  },
]

export const TEST_BOTTOM_BUTTON: TestBottomButton[] = [
  {
    id: 1,
    label: '테스트 다시하기',
    href: '/test',
  },
  {
    id: 2,
    label: '다른 패키지 둘러보기',
    href: '/package',
  },
]
