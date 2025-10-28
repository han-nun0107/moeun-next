import { ProductTitle } from '@/components/home'
import { MainSectionProps } from '@/types/main/mainSection'

import PopularCarousel from './PopularCarousel'

const PopularPackagesSection = ({ title, desc }: MainSectionProps) => {
  return (
    <section className="flex h-176 w-full items-center justify-center bg-[#d9d9d9]">
      <div className="flex h-126 w-320 flex-col items-start">
        <ProductTitle title={title} desc={desc} />
        <PopularCarousel />
      </div>
    </section>
  )
}

export default PopularPackagesSection
