import { ProductTitle } from '@/components/home'

type RecommendedDrinksSectionProps = {
  title: string
  desc: string[]
}

const RecommendedDrinksSection = ({
  title,
  desc,
}: RecommendedDrinksSectionProps) => {
  return (
    <section className="flex items-center justify-center py-25">
      <div className="flex h-235 w-320 flex-col gap-[50px]">
        <ProductTitle title={title} desc={desc} />

        <div className="grid grid-cols-4 grid-rows-2 gap-[27px]">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="flex h-95 w-75 items-center justify-center rounded-lg border border-gray-500"
            >
              Card {idx + 1}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecommendedDrinksSection
