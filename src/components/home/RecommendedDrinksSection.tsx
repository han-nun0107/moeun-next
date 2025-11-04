import Link from 'next/link'

import { Card } from '@/components'
import { ProductTitle } from '@/components/home'
import RECOMMENDED from '@/mocks/main/recommended'
import { MainSectionProps } from '@/types/main/mainSection'

const RecommendedDrinksSection = ({ title, desc }: MainSectionProps) => {
  return (
    <section className="flex items-center justify-center pb-25">
      <div className="flex w-320 flex-col gap-[50px]">
        <ProductTitle title={title} desc={desc} />

        <div className="grid grid-cols-4 gap-[27px]">
          {RECOMMENDED.map((item, idx) => (
            <Link key={`${item.title}-${idx}`} href={`/item/${idx + 1}`}>
              <Card
                type="product"
                data={{
                  img: item.img,
                  alt: item.alt,
                  title: item.title,
                  subtitle: item.subtitle,
                  price: item.price,
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecommendedDrinksSection
