import { DB_TABLES } from '@/constants/supabase-db/dbTables'
import type { CartTable } from '@/types/supabase'
import { getCurrentKSTISOString } from '@/utils/date/toKST'
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
    imageUrl?: string
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

    const now = getCurrentKSTISOString()
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
      image_url: options?.imageUrl || null,
      created_at: now,
      updated_at: now,
    }

    // ts-expect-error - Supabase 클라이언트의 insert 메소드 타입이 제대로 추론되지 않음
    const insertResult = await (supabase
      .from(DB_TABLES.CART)
      .insert(cartItem as never)
      .select()
      .single() as unknown as Promise<{
      data: CartRow | null
      error: { message: string } | null
    }>)

    const { data, error } = insertResult

    if (error) {
      return createErrorResponse<CartRow>(error.message)
    }

    // UTC 시간을 KST로 변환
    const convertedData = data
      ? {
          ...data,
          created_at: getCurrentKSTISOString() || data.created_at,
          updated_at: getCurrentKSTISOString() || data.updated_at,
          pickup_date: data.pickup_date
            ? getCurrentKSTISOString() || data.pickup_date
            : null,
        }
      : data

    return createSuccessResponse(convertedData)
  } catch (error) {
    if (error instanceof CartError) {
      return createErrorResponse<CartRow>(error.message)
    }
    return createErrorResponse<CartRow>('장바구니 추가 중 오류가 발생했습니다.')
  }
}

type CartRowWithProduct = CartRow & {
  product_detail?: {
    id: string
    name: string
    price: number
    description_image_url: string
  } | null
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
      return createErrorResponse<CartRowWithProduct[]>(error.message)
    }

    // UTC 시간을 KST로 변환
    const convertedData = ((data as CartRowWithProduct[]) || []).map(
      (item) => ({
        ...item,
        created_at: getCurrentKSTISOString() || item.created_at,
        updated_at: getCurrentKSTISOString() || item.updated_at,
        pickup_date: item.pickup_date
          ? getCurrentKSTISOString() || item.pickup_date
          : null,
      })
    )

    return createSuccessResponse(convertedData)
  } catch (error) {
    if (error instanceof CartError) {
      return createErrorResponse<CartRowWithProduct[]>(error.message)
    }
    return createErrorResponse<CartRowWithProduct[]>(
      '장바구니 조회 중 오류가 발생했습니다.'
    )
  }
}

export const updateCartItem = async (cartId: number, updates: CartUpdate) => {
  try {
    const now = getCurrentKSTISOString()
    const updatesWithTimestamp: CartUpdate = {
      ...updates,
      updated_at: now,
    }
    // ts-expect-error - Supabase 클라이언트의 update 메소드 타입이 제대로 추론되지 않음
    const updateResult = await (supabase
      .from(DB_TABLES.CART)
      .update(updatesWithTimestamp as never)
      .eq('id', cartId)
      .select()
      .single() as unknown as Promise<{
      data: CartRow | null
      error: { message: string } | null
    }>)

    const { data, error } = updateResult

    if (error) {
      return createErrorResponse<CartRow>(error.message)
    }

    if (!data) {
      return createErrorResponse<CartRow>('장바구니 항목을 찾을 수 없습니다.')
    }

    // UTC 시간을 KST로 변환
    const convertedData = {
      ...data,
      created_at: getCurrentKSTISOString() || data.created_at,
      updated_at: getCurrentKSTISOString() || data.updated_at,
      pickup_date: data.pickup_date
        ? getCurrentKSTISOString() || data.pickup_date
        : null,
    }

    return createSuccessResponse(convertedData)
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
