export type MainSectionProps = {
  title: string
  desc: string[]
}

export type MonthlyFeaturedSectionProps = MainSectionProps & {
  type?: 'monthly' | 'package'
}
