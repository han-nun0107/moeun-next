import { ProductTitle } from '@/components/home'
import { MainSectionProps } from '@/types/main/mainSection'

import PopularCarousel from './PopularCarousel'

const PopularPackagesSection = ({ title, desc }: MainSectionProps) => {
  return (
    <section className="flex-center h-176 w-full bg-gray-300">
      <div className="flex h-126 w-320 flex-col items-start">
        <ProductTitle title={title} desc={desc} />
        <PopularCarousel />
      </div>
    </section>
  )
}

export default PopularPackagesSection
