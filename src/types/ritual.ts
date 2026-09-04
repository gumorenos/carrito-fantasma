import type { AppMode, CartItem, StoreId, UrgeRating } from './product'

export type RitualSnapshot = {
  items: CartItem[]
  subtotalInCents: number
  mode: AppMode
  storeId: StoreId
  storeName: string
  initialUrgeRating?: UrgeRating
}
