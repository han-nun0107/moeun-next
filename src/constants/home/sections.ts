import dynamic from 'next/dynamic'

import { MAIN_TITLE } from './title'

const MonthlyFeaturedSection = dynamic(() => import('@/components/home/MonthlyFeaturedSection'))
const PopularPackagesSection = dynamic(() => import('@/components/home/PopularPackagesSection'))
const RecommendedDrinksSection = dynamic(() => import('@/components/home/RecommendedDrinksSection'))

export const HOME_SECTIONS = [
  {
    Component: MonthlyFeaturedSection,
    ...MAIN_TITLE[0],
  },
  {
    Component: PopularPackagesSection,
    ...MAIN_TITLE[1],
  },
  {
    Component: RecommendedDrinksSection,
    ...MAIN_TITLE[2],
  },
]
