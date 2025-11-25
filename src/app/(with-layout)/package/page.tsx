'use client'

import { BannerCarousel } from '@/components/home'
import { CAROUSEL } from '@/constants/carousel/carousel'
import { getPackageSections } from '@/constants/package/sections'
import { useLoginStore } from '@/stores/useLoginStore'
import { getUsername } from '@/utils/getUsername'

const Package = () => {
  const { user } = useLoginStore()
  const username = getUsername(user, undefined)
  const packageSections = getPackageSections(username)

  return (
    <section className="min-h-screen">
      <BannerCarousel
        {...CAROUSEL.Package}
        gap={1}
        type="package"
        variant="BUY"
        className="text-text-26"
      />

      <div className="flex flex-col gap-25">
        {packageSections.map(({ Component, title, desc, type }) => (
          <Component key={title} title={title} desc={desc} type={type} />
        ))}
      </div>
    </section>
  )
}

export default Package
