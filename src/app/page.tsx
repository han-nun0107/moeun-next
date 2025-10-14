import {
  HomeCarousel,
  MonthlyFeaturedSection,
  PopularPackagesSection,
  RecommendedDrinksSection,
} from '@/components/home'
import { MAIN_TITLE } from '@/constants'

const Home = async () => {
  const SECTIONS = [
    { Component: MonthlyFeaturedSection, ...MAIN_TITLE[0] },
    { Component: PopularPackagesSection, ...MAIN_TITLE[1] },
    { Component: RecommendedDrinksSection, ...MAIN_TITLE[2] },
  ]

  return (
    <section className="min-h-screen">
      <HomeCarousel />

      <div className="flex flex-col gap-25">
        {SECTIONS.map(({ Component, title, desc }) => (
          <Component key={title} title={title} desc={desc} />
        ))}
      </div>
    </section>
  )
}

export default Home
