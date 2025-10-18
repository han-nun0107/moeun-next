import {
  MonthlyFeaturedSection,
  PopularPackagesSection,
  RecommendedDrinksSection,
} from '@/components/home'

import { MAIN_TITLE } from './title'

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
