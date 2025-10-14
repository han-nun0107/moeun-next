import {
  HomeCarousel,
  MonthlyFeaturedSection,
  PopularPackagesSection,
  RecommendedDrinksSection,
} from '@/components/home'
import { MAIN_TITLE } from '@/constants'

const Home = async () => {
  const SECTIONS = [
    MonthlyFeaturedSection,
    PopularPackagesSection,
    RecommendedDrinksSection,
  ]

  return (
    <section className="min-h-screen">
      <HomeCarousel />

      <div className="flex flex-col gap-25">
        {MAIN_TITLE.map((title, index) => {
          const SectionComponent = SECTIONS[index]
          return (
            <SectionComponent
              key={title.title + index}
              title={title.title}
              desc={title.desc}
            />
          )
        })}
      </div>
    </section>
  )
}

export default Home
