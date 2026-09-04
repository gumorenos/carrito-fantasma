import type { AppMode, CartItem, StoreId } from './product'

export type RitualSnapshot = {
  items: CartItem[]
  subtotalInCents: number
  mode: AppMode
  storeId: StoreId
  storeName: string
}
