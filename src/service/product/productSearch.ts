import {
  DB_TABLES,
  type ProductDetail,
  type ProductDetailRow,
  type TasteProfileRow,
  ProductError,
  supabase,
} from './productBase'
import {
  buildProductDetailFromRow,
  fetchProductImagesBatch,
} from './productList'

type SearchCheckboxFilters = {
  gift: boolean
  regional: boolean
  award: boolean
  limited: boolean
}

type SearchSliderFilters = {
  sweetness: number
  body: number
  acidity: number
  carbonation: number
  bitter: number
  aroma: number
}

type SearchProductsParams = {
  query: string
  page: number
  pageSize: number
  checkboxes: SearchCheckboxFilters
  sliders: SearchSliderFilters
}

export type SearchProductsResult = {
  data: ProductDetail[]
  total: number
  error: Error | null
}

const filterByTasteProfile = (
  products: ProductDetailRow[],
  sliders: SearchSliderFilters,
  tasteProfiles: Record<number, TasteProfileRow | undefined>
) => {
  const hasSliderFilter = Object.values(sliders).some((value) => value > 0)
  if (!hasSliderFilter) return products

  const tasteKeyMap: Record<keyof SearchSliderFilters, keyof TasteProfileRow> =
    {
      sweetness: 'sweetness',
      body: 'body',
      acidity: 'acidity',
      carbonation: 'carbonation',
      bitter: 'bitterness',
      aroma: 'aroma',
    }

  return products.filter((product) => {
    if (!product.drink_id) return false
    const taste = tasteProfiles[product.drink_id]
    if (!taste) return false

    return (Object.keys(sliders) as (keyof SearchSliderFilters)[]).every(
      (key) => {
        const filterValue = sliders[key]
        if (filterValue <= 0) return true
        const tasteValue = Number(taste[tasteKeyMap[key]] ?? 0)
        return tasteValue >= filterValue
      }
    )
  })
}

export const searchProducts = async (
  params: SearchProductsParams
): Promise<SearchProductsResult> => {
  const { query, page, pageSize, checkboxes, sliders } = params
  const offset = (page - 1) * pageSize

  try {
    const baseQuery = supabase
      .from(DB_TABLES.PRODUCTS)
      .select('*', { count: 'exact' })
      .eq('status', 'ACTIVE')

    if (query.trim()) {
      const q = `%${query.trim()}%`
      baseQuery.or(`name.ilike.${q},description.ilike.${q}`)
    }

    if (checkboxes.gift) baseQuery.eq('is_gift_suitable', true)
    if (checkboxes.regional) baseQuery.eq('is_regional_specialty', true)
    if (checkboxes.award) baseQuery.eq('is_award_winning', true)
    if (checkboxes.limited) baseQuery.eq('is_limited_edition', true)

    const needsTasteFilter = Object.values(sliders).some((value) => value > 0)

    const { data, error, count } = needsTasteFilter
      ? await baseQuery
      : await baseQuery.range(offset, offset + pageSize - 1)

    if (error) {
      return {
        data: [],
        total: 0,
        error: new ProductError(
          `상품 검색 중 오류가 발생했습니다: ${error.message}`
        ),
      }
    }

    const productRows = (data || []) as ProductDetailRow[]

    let filteredRows = productRows
    let total = count || productRows.length

    if (needsTasteFilter) {
      const drinkIds = productRows
        .map((p) => p.drink_id)
        .filter((id): id is number => id != null)

      let tasteMap: Record<number, TasteProfileRow | undefined> = {}
      if (drinkIds.length > 0) {
        const { data: tasteData, error: tasteError } = await supabase
          .from(DB_TABLES.TASTE_PROFILE)
          .select('*')
          .in('id', drinkIds)

        if (!tasteError && tasteData) {
          tasteMap = (tasteData as TasteProfileRow[]).reduce<
            Record<number, TasteProfileRow>
          >((acc, cur) => {
            acc[cur.id] = cur
            return acc
          }, {})
        }
      }

      filteredRows = filterByTasteProfile(productRows, sliders, tasteMap)
      total = filteredRows.length

      const start = offset
      const end = offset + pageSize
      filteredRows = filteredRows.slice(start, end)
    }

    // 이미지 포함된 상세 Card용 정보로 변환
    const productIds = filteredRows.map((p) => p.id)
    const imagesByProductId = await fetchProductImagesBatch(productIds)

    const productsWithDetails: ProductDetail[] = filteredRows.map((product) => {
      const images = imagesByProductId[product.id] || []
      return buildProductDetailFromRow(product, images)
    })

    return { data: productsWithDetails, total, error: null }
  } catch (error) {
    return {
      data: [],
      total: 0,
      error:
        error instanceof ProductError
          ? error
          : new ProductError('상품 검색을 수행하는 중 오류가 발생했습니다.'),
    }
  }
}
