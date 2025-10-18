import {
  MonthlyFeaturedSection,
  PopularPackagesSection,
  RecommendedDrinksSection,
} from '@/components/home'

import { PACKAGE_TITLE } from './title'

type PackageSection = {
  Component: React.FC<{
    title: string
    desc: string[]
    type?: 'monthly' | 'package'
  }>
  title: string
  desc: string[]
  type?: 'monthly' | 'package'
}

export const PACKAGE_SECTIONS: PackageSection[] = [
  {
    Component: MonthlyFeaturedSection,
    ...PACKAGE_TITLE[0],
    type: 'package',
  },
  {
    Component: PopularPackagesSection,
    ...PACKAGE_TITLE[1],
  },
  {
    Component: RecommendedDrinksSection,
    ...PACKAGE_TITLE[2],
  },
]
