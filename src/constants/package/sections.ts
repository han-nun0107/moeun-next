import {
  MonthlyFeaturedSection,
  PopularPackagesSection,
  RecommendedDrinksSection,
} from '@/components/home'

import { PACKAGE_TITLE } from './title'

type PackageSectionProps = {
  title: string
  desc: string[]
  type?: 'monthly' | 'package'
}

type PackageSection = {
  Component: React.ComponentType<PackageSectionProps>
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
