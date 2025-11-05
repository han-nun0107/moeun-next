import Link from 'next/link'

import { Card } from '@/components'
import { ProductTitle } from '@/components/home'
import MONTHLY from '@/mocks/main/monthly'
import PACKAGE_RECOMMENDED from '@/mocks/package/recommended'
import { MonthlyFeaturedSectionProps } from '@/types/main/mainSection'
import { cn } from '@/utils/cn'

const MonthlyFeaturedSection = ({
  title,
  desc,
  type = 'monthly',
}: MonthlyFeaturedSectionProps) => {
  const products =
    type === 'package' ? PACKAGE_RECOMMENDED.slice(0, 4) : MONTHLY.slice(0, 3)

  return (
    <section className="flex-center py-25">
      <div
        className={cn(
          'flex h-95 w-320 gap-24',
          type === 'package' && 'flex-col gap-12'
        )}
      >
        <ProductTitle title={title} desc={desc} />
        <div className="flex gap-[23.4px]">
          {products.map((product) => (
            <Link
              key={`${product.name}-${product.id}`}
              href={`/item/${product.id}`}
            >
              <Card
                type="product"
                data={{
                  title: product.title,
                  subtitle: product.subtitle,
                  price: product.price,
                  img: product.img,
                  alt: product.alt,
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MonthlyFeaturedSection
