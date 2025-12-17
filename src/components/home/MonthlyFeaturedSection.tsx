'use client'

import Link from 'next/link'

import { Card } from '@/components'
import { ProductTitle } from '@/components/home'
import { IMAGE_URLS } from '@/constants'
import { useProduct } from '@/hooks/product/useProduct'
import { MonthlyFeaturedSectionProps } from '@/types/main/mainSection'
import { Product } from '@/types/product'
import { cn } from '@/utils/cn'

const MonthlyFeaturedSection = ({
  title,
  desc,
  type = 'monthly',
}: MonthlyFeaturedSectionProps) => {
  const { products } = useProduct(type === 'monthly' ? 'individual' : 'package')
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
          {products.map((product: Product) => (
            <Link
              key={`${product.name}-${product.id}`}
              href={`/item/${product.id}`}
            >
              <Card
                type="product"
                data={{
                  title: product.name,
                  subtitle: product.description || product.brewery_name || '',
                  price: product.final_price || product.price || 0,
                  img:
                    product.main_image_url ||
                    product.img ||
                    IMAGE_URLS.Product.Default,
                  alt: product.name,
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
