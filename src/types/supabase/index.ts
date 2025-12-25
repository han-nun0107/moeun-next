export type { Json } from './common'
export type { Tables } from './tables'
export type { CartTable } from './tables/cart'
export type { ProductDetailTable } from './tables/product_detail'

export type Database = {
  public: {
    Tables: import('./tables').Tables
  }
}
