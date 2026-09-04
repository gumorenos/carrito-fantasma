import type { AppMode, CartItem, ProductCategory, StoreId, UrgeRating } from './product'

export type StillWantsToBuy = 'yes' | 'no' | 'maybe'

export type GhostCartHistoryEntry = {
  id: string
  date: string
  mode: AppMode
  storeId: StoreId
  storeName: string
  items: CartItem[]
  subtotalAvoidedInCents: number
  categories: ProductCategory[]
  urgeRating?: UrgeRating
  stillWantsToBuy?: StillWantsToBuy
  createdAt: string
}
