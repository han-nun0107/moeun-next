import { DB_TABLES } from '@/constants/supabase-db/dbTables'
import type { ProductDetail } from '@/types/product'
import type { Database } from '@/types/supabase'
import { supabase } from '@/utils/supabase'

type ProductDetailRow = Database['public']['Tables']['product_detail']['Row']
type ProductDetailUpdate =
  Database['public']['Tables']['product_detail']['Update']
type DrinkInfoRow = Database['public']['Tables']['drink_info']['Row']
type TasteProfileRow = Database['public']['Tables']['taste_profile']['Row']
type ProductImageRow = Database['public']['Tables']['product_image']['Row']

class ProductError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ProductError'
  }
}

const createErrorResponse = <T>(message: string) => ({
  data: null as T,
  error: new ProductError(message),
})

const createSuccessResponse = <T>(data: T) => ({
  data,
  error: null,
})

const fetchProduct = async (productId: string) => {
  const { data, error } = await supabase
    .from(DB_TABLES.PRODUCTS)
    .select('*')
    .eq('id', productId)
    .eq('status', 'ACTIVE')
    .single()

  if (error) throw new ProductError(error.message)
  if (!data) throw new ProductError('상품을 찾을 수 없습니다.')

  return data as ProductDetailRow
}

const fetchProductImages = async (productId: string) => {
  const { data, error } = await supabase
    .from(DB_TABLES.PRODUCT_IMAGE)
    .select('*')
    .eq('product_id', productId)
    .order('is_main', { ascending: false })

  if (error) {
    // eslint-disable-next-line no-console
    console.warn('Failed to fetch product images:', error)
    return []
  }

  return (data || []) as ProductImageRow[]
}

const fetchProductImagesBatch = async (
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

const fetchDrinkInfo = async (drinkId: string) => {
  const { data, error } = await supabase
    .from(DB_TABLES.DRINK_INFO)
    .select('*')
    .eq('id', drinkId)
    .single()

  if (error) throw new ProductError(error.message)
  if (!data) throw new ProductError('음료 정보를 찾을 수 없습니다.')

  return data as DrinkInfoRow
}

const fetchTasteProfile = async (drinkId: string) => {
  const { data, error } = await supabase
    .from(DB_TABLES.TASTE_PROFILE)
    .select('*')
    .eq('id', drinkId)
    .single()

  if (error) throw new ProductError(error.message)
  if (!data) throw new ProductError('맛 프로파일 정보를 찾을 수 없습니다.')

  return data as TasteProfileRow
}

const buildDrinkInfo = async (drinkId: string) => {
  const [drinkInfo, tasteProfile] = await Promise.all([
    fetchDrinkInfo(drinkId),
    fetchTasteProfile(drinkId),
  ])

  return {
    id: drinkInfo.id,
    name: drinkInfo.name,
    brewery: {
      id: drinkInfo.brewery_id,
      name: '',
      region: null,
    },
    ingredients: drinkInfo.ingredients,
    alcohol_type: drinkInfo.alcohol_type,
    alcohol_type_display: drinkInfo.alcohol_type_display,
    abv: drinkInfo.abv,
    volume_ml: drinkInfo.volume_ml,
    taste_profile: {
      sweetness: tasteProfile.sweetness,
      acidity: tasteProfile.acidity,
      body: tasteProfile.body,
      carbonation: tasteProfile.carbonation,
      bitterness: tasteProfile.bitterness,
      aroma: tasteProfile.aroma,
    },
    created_at: drinkInfo.created_at,
    updated_at: drinkInfo.updated_at,
  }
}

const buildProductDetail = (
  product: ProductDetailRow,
  images: ProductImageRow[],
  drink: Awaited<ReturnType<typeof buildDrinkInfo>> | null
): ProductDetail => {
  return {
    id: product.id,
    name: product.name,
    product_type: product.product_type,
    drink,
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
    main_image_url:
      images.find((img) => img.is_main === true)?.image_url ||
      images[0]?.image_url ||
      product.description_image_url,
  }
}

const incrementViewCount = async (productId: string, currentCount: number) => {
  try {
    const updateData: ProductDetailUpdate = { view_count: currentCount + 1 }
    const updateQuery = supabase.from(DB_TABLES.PRODUCTS) as unknown as {
      update: (values: ProductDetailUpdate) => {
        eq: (column: string, value: string) => Promise<unknown>
      }
    }
    await updateQuery.update(updateData).eq('id', productId)
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.warn('Failed to increment view count:', error)
  }
}

export const getProducts = async (type: 'package' | 'individual') => {
  const { data, error } = await supabase
    .from(DB_TABLES.PRODUCTS)
    .select('*')
    .eq('product_type', type)
  return { data, error }
}

const buildProductDetailFromRow = (
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

export const getProductDetail = async (
  productId: string
): Promise<{ data: ProductDetail | null; error: Error | null }> => {
  try {
    const [product, images] = await Promise.all([
      fetchProduct(productId),
      fetchProductImages(productId),
    ])

    let drink = null
    if (product.product_type === 'individual' && product.drink_id) {
      drink = await buildDrinkInfo(product.drink_id.toString())
    }

    const productDetail = buildProductDetail(product, images, drink)

    void incrementViewCount(productId, product.view_count || 0)

    return createSuccessResponse(productDetail)
  } catch (error) {
    if (error instanceof ProductError) {
      return createErrorResponse(error.message)
    }
    return createErrorResponse('알 수 없는 오류가 발생했습니다.')
  }
}
