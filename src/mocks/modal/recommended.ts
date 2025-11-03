import { IMAGE_URLS } from '@/constants'

type RecommendedItem = {
  id: number
  img: string
  alt: string
  title: string
  alcohol?: string
  smell?: string
  type: 'list' | 'package'
}

export const RECOMMENDED: RecommendedItem[] = [
  {
    id: 1,
    img: IMAGE_URLS.Product.Default,
    alt: 'recommended1',
    title: 'recommended1',
    alcohol: '17%',
    smell: '달콤한 향',
    type: 'list',
  },
  {
    id: 2,
    img: IMAGE_URLS.Product.Default,
    alt: 'recommended2',
    title: 'recommended2',
    alcohol: '17%',
    smell: '달콤한 향',
    type: 'list',
  },
  {
    id: 3,
    img: IMAGE_URLS.Product.Default,
    alt: 'recommended3',
    title: 'recommended3',
    alcohol: '17%',
    smell: '달콤한 향',
    type: 'list',
  },
  {
    id: 4,
    img: IMAGE_URLS.Product.Default,
    alt: 'recommended4',
    title: 'recommended4',
    alcohol: '17%',
    smell: '달콤한 향',
    type: 'list',
  },
  {
    id: 5,
    img: IMAGE_URLS.Product.Default,
    alt: 'recommended5',
    title: 'recommended5',
    alcohol: '17%',
    smell: '달콤한 향',
    type: 'package',
  },
  {
    id: 6,
    img: IMAGE_URLS.Product.Default,
    alt: 'recommended6',
    title: 'recommended6',
    alcohol: '17%',
    smell: '달콤한 향',
    type: 'package',
  },
  {
    id: 7,
    img: IMAGE_URLS.Product.Default,
    alt: 'recommended7',
    title: 'recommended7',
    alcohol: '17%',
    smell: '달콤한 향',
    type: 'package',
  },
  {
    id: 8,
    img: IMAGE_URLS.Product.Default,
    alt: 'recommended8',
    title: 'recommended8',
    alcohol: '17%',
    smell: '달콤한 향',
    type: 'package',
  },
]
