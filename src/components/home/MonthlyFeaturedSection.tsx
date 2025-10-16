import { Card } from '@/components'
import { ProductTitle } from '@/components/home'
import MONTHLY from '@/mocks/main/monthly'

type MonthlyFeaturedSectionProps = {
  title: string
  desc: string[]
}

const MonthlyFeaturedSection = ({
  title,
  desc,
}: MonthlyFeaturedSectionProps) => {
  return (
    <section className="flex items-center justify-center py-25">
      <div className="flex h-95 w-320 gap-24">
        <ProductTitle title={title} desc={desc} />
        <div className="flex gap-[23.4px]">
          {MONTHLY.map((product, index) => (
            <Card
              type="product"
              key={`${product.title}-${index}`}
              data={{
                title: product.title,
                subtitle: product.subtitle,
                price: product.price,
                img: product.img,
                alt: product.alt,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MonthlyFeaturedSection
