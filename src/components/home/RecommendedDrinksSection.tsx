import { Card } from '@/components'
import { ProductTitle } from '@/components/home'
import RECOMMENDED from '@/mocks/main/recommended'

type RecommendedDrinksSectionProps = {
  title: string
  desc: string[]
}

const RecommendedDrinksSection = ({
  title,
  desc,
}: RecommendedDrinksSectionProps) => {
  return (
    <section className="flex items-center justify-center pb-25">
      <div className="flex h-235 w-320 flex-col gap-[50px]">
        <ProductTitle title={title} desc={desc} />

        <div className="grid grid-cols-4 grid-rows-2 gap-[27px]">
          {RECOMMENDED.map((item, idx) => (
            <Card
              type="product"
              key={`${item.title}-${idx}`}
              data={{
                img: item.img,
                alt: item.alt,
                title: item.title,
                subtitle: item.subtitle,
                price: item.price,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecommendedDrinksSection
