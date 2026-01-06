import {
  DB_TABLES,
  type ProductDetail,
  type ProductDetailRow,
  type ProductImageRow,
  ProductError,
  supabase,
} from './productBase'

export const buildProductDetailFromRow = (
  product: ProductDetailRow,
  images: ProductImageRow[]
): ProductDetail => {
  const mainImageUrl =
    images.find((img) => img.is_main === true)?.image_url ||
    images[0]?.image_url ||
    product.description_image_url

  return {
    id: product.id,
    name: product.name,
    product_type: product.product_type,
    drink: null,
    package: null,
    price: product.price,
    original_price: product.original_price,
    discount: product.discount,
    discount_rate: product.discount_rate,
    final_price: product.final_price,
    is_on_sale: product.is_on_sale,
    description: product.description,
    description_image_url: product.description_image_url,
    is_gift_suitable: product.is_gift_suitable,
    is_award_winning: product.is_award_winning,
    is_regional_specialty: product.is_regional_specialty,
    is_limited_edition: product.is_limited_edition,
    is_premium: product.is_premium,
    is_organic: product.is_organic,
    view_count: product.view_count,
    order_count: product.order_count,
    like_count: product.like_count,
    review_count: product.review_count,
    status: product.status,
    images: images.map((img) => ({
      image_url: img.image_url,
      is_main: img.is_main,
    })),
    created_at: product.created_at,
    updated_at: product.updated_at,
    main_image_url: mainImageUrl,
  }
}

export const fetchProductImagesBatch = async (
  productIds: string[]
): Promise<Record<string, ProductImageRow[]>> => {
  if (productIds.length === 0) {
    return {}
  }

  const { data, error } = await supabase
    .from(DB_TABLES.PRODUCT_IMAGE)
    .select('*')
    .in('product_id', productIds)
    .order('is_main', { ascending: false })

  if (error) {
    // eslint-disable-next-line no-console
    console.warn('Failed to fetch product images batch:', error)
    return {}
  }

  const imagesByProductId: Record<string, ProductImageRow[]> = {}
  for (const image of (data || []) as ProductImageRow[]) {
    if (!imagesByProductId[image.product_id]) {
      imagesByProductId[image.product_id] = []
    }
    imagesByProductId[image.product_id].push(image)
  }

  return imagesByProductId
}

export const getProducts = async (type: 'package' | 'individual') => {
  const { data, error } = await supabase
    .from(DB_TABLES.PRODUCTS)
    .select('*')
    .eq('product_type', type)
  return { data, error }
}

const getProductList = async (
  orderBy: { column: string; ascending: boolean },
  limit: number,
  offset = 0
): Promise<{ data: ProductDetail[] | null; error: Error | null }> => {
  try {
    const { data: products, error: productsError } = await supabase
      .from(DB_TABLES.PRODUCTS)
      .select('*')
      .eq('status', 'ACTIVE')
      .order(orderBy.column, { ascending: orderBy.ascending })
      .range(offset, offset + limit - 1)

    if (productsError) {
      return { data: null, error: new ProductError(productsError.message) }
    }

    if (!products || products.length === 0) {
      return { data: [], error: null }
    }

    const productRows = products as unknown as ProductDetailRow[]
    const productIds = productRows.map((p) => p.id)

    const imagesByProductId = await fetchProductImagesBatch(productIds)

    const productsWithImages = productRows.map((product) => {
      const images = imagesByProductId[product.id] || []
      return buildProductDetailFromRow(product, images)
    })

    return { data: productsWithImages, error: null }
  } catch (error) {
    if (error instanceof ProductError) {
      return { data: null, error }
    }
    return {
      data: null,
      error: new ProductError('상품 목록을 불러오는 중 오류가 발생했습니다.'),
    }
  }
}

export const getRecommendedProducts = async (
  limit = 8,
  offset = 0
): Promise<{ data: ProductDetail[] | null; error: Error | null }> => {
  const result = await getProductList(
    { column: 'view_count', ascending: false },
    limit,
    offset
  )

  if (result.error) {
    return {
      data: null,
      error: new ProductError(
        `추천 상품을 불러오는 중 오류가 발생했습니다: ${result.error.message}`
      ),
    }
  }

  return result
}

export const getPopularProducts = async (
  limit = 6
): Promise<{ data: ProductDetail[] | null; error: Error | null }> => {
  const result = await getProductList(
    { column: 'order_count', ascending: false },
    limit,
    0
  )

  if (result.error) {
    return {
      data: null,
      error: new ProductError(
        `인기 상품을 불러오는 중 오류가 발생했습니다: ${result.error.message}`
      ),
    }
  }

  return result
}
