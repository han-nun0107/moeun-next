import { DB_TABLES } from '@/constants/supabase-db/dbTables'
import type { CartTable } from '@/types/supabase'
import { supabase } from '@/utils/supabase'

type CartRow = CartTable['Row']
type CartInsert = CartTable['Insert']
type CartUpdate = CartTable['Update']

class CartError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CartError'
  }
}

const createErrorResponse = <T>(message: string) => ({
  data: null as T,
  error: new CartError(message),
})

const createSuccessResponse = <T>(data: T) => ({
  data,
  error: null,
})

export const addToCart = async (
  userId: string,
  productId: number,
  quantity: number,
  options?: {
    orderRegion?: string
    pickupStoreName?: string
    pickupStoreAddress?: string
    pickupStoreContact?: string
    pickupDate?: string
    priceAtAdded?: number
  }
) => {
  try {
    const { data: product, error: productError } = await supabase
      .from(DB_TABLES.PRODUCTS)
      .select('price')
      .eq('id', productId.toString())
      .single()

    if (productError || !product) {
      return createErrorResponse<CartRow>('상품을 찾을 수 없습니다.')
    }

    const productPrice = (product as { price: number }).price

    const queryBuilder = supabase
      .from(DB_TABLES.CART)
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)

    const queryWithFilters = options?.orderRegion
      ? queryBuilder.eq('order_region', options.orderRegion)
      : queryBuilder.is('order_region', null)

    const queryWithStore = options?.pickupStoreName
      ? queryWithFilters.eq('pickup_store_name', options.pickupStoreName)
      : queryWithFilters.is('pickup_store_name', null)

    const finalQuery = options?.pickupDate
      ? queryWithStore.eq('pickup_date', options.pickupDate)
      : queryWithStore.is('pickup_date', null)

    const { data: existingCart } = await finalQuery.single<CartRow>()

    if (existingCart) {
      const cartRow = existingCart as CartRow
      const newQuantity = cartRow.quantity + quantity
      return await updateCartItem(cartRow.id, { quantity: newQuantity })
    }

    const cartItem: CartInsert = {
      user_id: userId,
      product_id: productId,
      quantity,
      order_region: options?.orderRegion || null,
      pickup_store_name: options?.pickupStoreName || null,
      pickup_store_address: options?.pickupStoreAddress || null,
      pickup_store_contact: options?.pickupStoreContact || null,
      pickup_date: options?.pickupDate || null,
      price_at_added: options?.priceAtAdded || productPrice,
    }

    const insertQuery = (
      supabase.from(DB_TABLES.CART) as unknown as {
        insert: (values: CartInsert) => {
          select: (columns?: string) => {
            single: () => Promise<{ data: CartRow | null; error: Error | null }>
          }
        }
      }
    )
      .insert(cartItem)
      .select()
      .single()

    const insertResult = await insertQuery

    const { data, error } = insertResult

    if (error) {
      return createErrorResponse<CartRow>(error.message)
    }

    return createSuccessResponse(data)
  } catch (error) {
    if (error instanceof CartError) {
      return createErrorResponse<CartRow>(error.message)
    }
    return createErrorResponse<CartRow>('장바구니 추가 중 오류가 발생했습니다.')
  }
}

export const getCartItems = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from(DB_TABLES.CART)
      .select(
        `
        *,
        product_detail:product_id (
          id,
          name,
          price,
          description_image_url
        )
      `
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      return createErrorResponse<CartRow[]>(error.message)
    }

    return createSuccessResponse(data || [])
  } catch (error) {
    if (error instanceof CartError) {
      return createErrorResponse<CartRow[]>(error.message)
    }
    return createErrorResponse<CartRow[]>(
      '장바구니 조회 중 오류가 발생했습니다.'
    )
  }
}

export const updateCartItem = async (cartId: number, updates: CartUpdate) => {
  try {
    const updateQuery = (
      supabase.from(DB_TABLES.CART) as unknown as {
        update: (values: CartUpdate) => {
          eq: (
            column: string,
            value: number
          ) => {
            select: (columns?: string) => {
              single: () => Promise<{
                data: CartRow | null
                error: Error | null
              }>
            }
          }
        }
      }
    )
      .update(updates)
      .eq('id', cartId)
      .select()
      .single()

    const { data, error } = await updateQuery

    if (error) {
      return createErrorResponse<CartRow>(error.message)
    }

    if (!data) {
      return createErrorResponse<CartRow>('장바구니 항목을 찾을 수 없습니다.')
    }

    return createSuccessResponse(data)
  } catch (error) {
    if (error instanceof CartError) {
      return createErrorResponse<CartRow>(error.message)
    }
    return createErrorResponse<CartRow>('장바구니 수정 중 오류가 발생했습니다.')
  }
}

export const deleteCartItem = async (cartId: number) => {
  try {
    const { error } = await supabase
      .from(DB_TABLES.CART)
      .delete()
      .eq('id', cartId)

    if (error) {
      return createErrorResponse<boolean>(error.message)
    }

    return createSuccessResponse(true)
  } catch (error) {
    if (error instanceof CartError) {
      return createErrorResponse<boolean>(error.message)
    }
    return createErrorResponse<boolean>('장바구니 삭제 중 오류가 발생했습니다.')
  }
}

export const clearCart = async (userId: string) => {
  try {
    const { error } = await supabase
      .from(DB_TABLES.CART)
      .delete()
      .eq('user_id', userId)

    if (error) {
      return createErrorResponse<boolean>(error.message)
    }

    return createSuccessResponse(true)
  } catch (error) {
    if (error instanceof CartError) {
      return createErrorResponse<boolean>(error.message)
    }
    return createErrorResponse<boolean>(
      '장바구니 비우기 중 오류가 발생했습니다.'
    )
  }
}
