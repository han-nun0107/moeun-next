import { BannerCarousel } from '@/components/home'
import { CAROUSEL } from '@/constants/carousel/carousel'
import { PACKAGE_SECTIONS } from '@/constants/package/sections'

const Package = async () => {
  return (
    <section className="min-h-screen">
      <BannerCarousel
        {...CAROUSEL.Package}
        gap={1}
        type="package"
        variant="BUY"
        className="text-[26px]"
      />

      <div className="flex flex-col gap-25">
        {PACKAGE_SECTIONS.map(({ Component, title, desc, type }) => (
          <Component key={title} title={title} desc={desc} type={type} />
        ))}
      </div>
    </section>
  )
}

export default Package
