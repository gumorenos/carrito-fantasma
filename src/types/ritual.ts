import type { AppMode, CartItem, StoreId, UrgeRating } from './product'

export type RitualSnapshot = {
  id: string
  createdAt: string
  items: CartItem[]
  subtotalInCents: number
  mode: AppMode
  storeId: StoreId
  storeName: string
  initialUrgeRating?: UrgeRating
}
