import { BannerCarousel } from '@/components/home'
import { CAROUSEL } from '@/constants/carousel/carousel'
import { HOME_SECTIONS } from '@/constants/home/sections'

const Home = async () => {
  return (
    <section className="min-h-screen">
      <BannerCarousel
        {...CAROUSEL.Main}
        type="main"
        variant="TEST"
        className="text-xl"
      />

      <div className="flex flex-col gap-25">
        {HOME_SECTIONS.map(({ Component, title, desc }) => (
          <Component key={title} title={title} desc={desc} />
        ))}
      </div>
    </section>
  )
}

export default Home
