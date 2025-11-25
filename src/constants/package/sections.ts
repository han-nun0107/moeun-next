import {
  MonthlyFeaturedSection,
  PopularPackagesSection,
  RecommendedDrinksSection,
} from '@/components/home'

import { getPackageTitle } from './title'

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

export const getPackageSections = (username?: string): PackageSection[] => {
  const packageTitles = getPackageTitle(username)

  return [
    {
      Component: MonthlyFeaturedSection,
      ...packageTitles[0],
      type: 'package',
    },
    {
      Component: PopularPackagesSection,
      ...packageTitles[1],
    },
    {
      Component: RecommendedDrinksSection,
      ...packageTitles[2],
    },
  ]
}

// 하위 호환성을 위한 기본 export
export const PACKAGE_SECTIONS = getPackageSections()
