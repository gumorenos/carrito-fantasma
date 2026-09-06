export type AppMode = 'shopping' | 'food'

export type ShoppingCategory =
  | 'gadgets'
  | 'tecnología'
  | 'gaming'
  | 'hogar'
  | 'decoración'
  | 'belleza'
  | 'viral'
  | 'fomo'

export type FoodCategory =
  | 'pizzas'
  | 'pastas'
  | 'ensaladas'
  | 'platos'
  | 'hamburguesas'
  | 'pollo'
  | 'sushi'
  | 'postres'
  | 'snacks'
  | 'bebidas'

export type ProductCategory = ShoppingCategory | FoodCategory

export type ImpulseType =
  | 'aburrimiento'
  | 'ansiedad'
  | 'fomo'
  | 'antojo'
  | 'recompensa'
  | 'curiosidad'

export type StoreId =
  | 'flash-market'
  | 'todo-innecesario'
  | 'wishlist-club'
  | 'antojo-go'

export type Store = {
  id: StoreId
  mode: AppMode
  name: string
  description: string
  tagline: string
  imageUrl: string
  accentColor: string
  categories: readonly ProductCategory[]
}

export type Product = {
  images?: readonly string[]
  specifications?: readonly string[]
  variants?: readonly { id: string; label: string }[]
  id: string
  mode: AppMode
  storeId: StoreId
  name: string
  description: string
  category: ProductCategory
  priceInCents: number
  currency: 'PEN'
  tags: readonly string[]
  imageUrl: string
  impulseType: ImpulseType
}

export type CartItem = {
  productId: string
  storeId: StoreId
  name: string
  category: ProductCategory
  unitPriceInCents: number
  currency: 'PEN'
  imageUrl: string
  quantity: number
  addedAt: string
}

export type UrgeRating = 1 | 2 | 3 | 4 | 5

export type GhostCartSessionPhase =
  | 'catalog'
  | 'cart'
  | 'checkout'
  | 'tracking'
  | 'result'

export type GhostCartSession = {
  schemaVersion: 1
  id: string
  mode: AppMode
  storeId: StoreId
  storeName: string
  phase: GhostCartSessionPhase
  items: CartItem[]
  currency: 'PEN'
  initialUrgeRating?: UrgeRating
  finalUrgeRating?: UrgeRating
  startedAt: string
  updatedAt: string
  checkoutCompletedAt?: string
  savingRevealedAt?: string
  confirmedTotalInCents?: number
}
