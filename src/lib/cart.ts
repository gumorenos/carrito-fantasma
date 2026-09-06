import type {
  CartItem,
  Product,
  ProductCategory,
  StoreId,
} from '../types/product'
import { getCartStorageKey } from './storage'

export const MAX_CART_ITEM_QUANTITY = 20
export const MAX_CART_TOTAL_ITEMS = 99

const validStoreIds = new Set<StoreId>([
  'flash-market',
  'todo-innecesario',
  'wishlist-club',
  'antojo-go',
])

const validCategories = new Set<ProductCategory>([
  'gadgets',
  'tecnología',
  'gaming',
  'hogar',
  'decoración',
  'belleza',
  'viral',
  'fomo',
  'pizzas',
  'pastas',
  'ensaladas',
  'platos',
  'hamburguesas',
  'pollo',
  'sushi',
  'postres',
  'snacks',
  'bebidas',
])

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isCartItem(value: unknown): value is CartItem {
  if (!isRecord(value)) return false

  return (
    typeof value.productId === 'string' &&
    value.productId.length > 0 &&
    typeof value.storeId === 'string' &&
    validStoreIds.has(value.storeId as StoreId) &&
    typeof value.name === 'string' &&
    value.name.length > 0 &&
    typeof value.category === 'string' &&
    validCategories.has(value.category as ProductCategory) &&
    typeof value.unitPriceInCents === 'number' &&
    Number.isSafeInteger(value.unitPriceInCents) &&
    value.unitPriceInCents > 0 &&
    value.currency === 'PEN' &&
    typeof value.imageUrl === 'string' &&
    typeof value.quantity === 'number' &&
    Number.isInteger(value.quantity) &&
    value.quantity > 0 &&
    typeof value.addedAt === 'string'
  )
}

export function sanitizeCart(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return []

  const sanitized: CartItem[] = []
  let activeStoreId: StoreId | null = null

  for (const candidate of value) {
    if (!isCartItem(candidate)) continue
    if (activeStoreId && candidate.storeId !== activeStoreId) continue
    activeStoreId ??= candidate.storeId as StoreId

    const existing = sanitized.find(
      (item) => item.productId === candidate.productId,
    )

    if (existing) {
      const available = MAX_CART_TOTAL_ITEMS - getTotalItemCount(sanitized)
      existing.quantity = Math.min(
        existing.quantity + candidate.quantity,
        MAX_CART_ITEM_QUANTITY,
        existing.quantity + Math.max(available, 0),
      )
    } else {
      const available = MAX_CART_TOTAL_ITEMS - getTotalItemCount(sanitized)
      const quantity = Math.min(
        candidate.quantity,
        MAX_CART_ITEM_QUANTITY,
        Math.max(available, 0),
      )
      if (quantity > 0) sanitized.push({ ...candidate, quantity })
    }

    if (getTotalItemCount(sanitized) >= MAX_CART_TOTAL_ITEMS) break
  }

  return sanitized
}

export function readPersistedCart(): CartItem[] {
  try {
    if (typeof window === 'undefined') return []
    const raw = window.localStorage.getItem(getCartStorageKey())
    return raw ? sanitizeCart(JSON.parse(raw)) : []
  } catch {
    return []
  }
}

export function writePersistedCart(items: readonly CartItem[]): boolean {
  try {
    if (typeof window === 'undefined') return false
    window.localStorage.setItem(getCartStorageKey(), JSON.stringify(items))
    return true
  } catch {
    return false
  }
}

function getTotalItemCount(items: readonly CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0)
}

export function addItem(
  items: readonly CartItem[],
  product: Product,
): CartItem[] {
  if (!Number.isSafeInteger(product.priceInCents) || product.priceInCents <= 0)
    return [...items]
  if (items.some((item) => item.storeId !== product.storeId)) return [...items]

  const existingIndex = items.findIndex((item) => item.productId === product.id)
  const next = items.map((item) => ({ ...item }))

  if (existingIndex >= 0) {
    const existing = next[existingIndex]
    if (
      existing.quantity < MAX_CART_ITEM_QUANTITY &&
      getTotalItemCount(next) < MAX_CART_TOTAL_ITEMS
    ) {
      existing.quantity += 1
    }
    return next
  }

  if (getTotalItemCount(next) >= MAX_CART_TOTAL_ITEMS) return next

  next.push({
    productId: product.id,
    storeId: product.storeId,
    name: product.name,
    category: product.category,
    unitPriceInCents: product.priceInCents,
    currency: 'PEN',
    imageUrl: product.imageUrl,
    quantity: 1,
    addedAt: new Date().toISOString(),
  })

  return next
}

export function removeItem(
  items: readonly CartItem[],
  productId: string,
): CartItem[] {
  return items.filter((item) => item.productId !== productId)
}

export function incrementItem(
  items: readonly CartItem[],
  productId: string,
): CartItem[] {
  if (getTotalItemCount(items) >= MAX_CART_TOTAL_ITEMS) return [...items]

  return items.map((item) =>
    item.productId === productId && item.quantity < MAX_CART_ITEM_QUANTITY
      ? { ...item, quantity: item.quantity + 1 }
      : { ...item },
  )
}

export function decrementItem(
  items: readonly CartItem[],
  productId: string,
): CartItem[] {
  return items.map((item) =>
    item.productId === productId && item.quantity > 1
      ? { ...item, quantity: item.quantity - 1 }
      : { ...item },
  )
}

export function clearCart(): CartItem[] {
  return []
}

export function getCartSubtotal(items: readonly CartItem[]): number {
  return items.reduce(
    (subtotal, item) => subtotal + item.unitPriceInCents * item.quantity,
    0,
  )
}

export function getCartItemCount(items: readonly CartItem[]): number {
  return getTotalItemCount(items)
}
