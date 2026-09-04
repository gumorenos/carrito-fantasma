import { sanitizeCart } from './cart'
import { getHistoryStorageKey } from './storage'
import type { GhostCartHistoryEntry, StillWantsToBuy } from '../types/history'
import type { AppMode, Product, ProductCategory, StoreId, UrgeRating } from '../types/product'

export const MAX_HISTORY_ENTRIES = 100

const validModes = new Set<AppMode>(['shopping', 'food'])
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
  'hamburguesas',
  'pollo',
  'sushi',
  'postres',
  'snacks',
  'bebidas',
])
const validStillWants = new Set<StillWantsToBuy>(['yes', 'no', 'maybe'])

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isUrgeRating(value: unknown): value is UrgeRating {
  return value === 1 || value === 2 || value === 3 || value === 4 || value === 5
}

function sanitizeEntry(value: unknown): GhostCartHistoryEntry | null {
  if (!isRecord(value)) return null
  if (
    typeof value.id !== 'string' ||
    typeof value.date !== 'string' ||
    typeof value.mode !== 'string' ||
    !validModes.has(value.mode as AppMode) ||
    typeof value.storeId !== 'string' ||
    !validStoreIds.has(value.storeId as StoreId) ||
    typeof value.storeName !== 'string' ||
    typeof value.subtotalAvoidedInCents !== 'number' ||
    !Number.isSafeInteger(value.subtotalAvoidedInCents) ||
    value.subtotalAvoidedInCents < 0 ||
    !Array.isArray(value.categories) ||
    typeof value.createdAt !== 'string'
  ) {
    return null
  }

  const items = sanitizeCart(value.items)
  const categories = value.categories.filter((category): category is ProductCategory =>
    typeof category === 'string' && validCategories.has(category as ProductCategory),
  )
  const urgeRating = value.urgeRating === undefined || isUrgeRating(value.urgeRating) ? value.urgeRating : undefined
  const stillWantsToBuy = value.stillWantsToBuy === undefined || validStillWants.has(value.stillWantsToBuy as StillWantsToBuy)
    ? value.stillWantsToBuy as StillWantsToBuy | undefined
    : undefined

  return {
    id: value.id,
    date: value.date,
    mode: value.mode as AppMode,
    storeId: value.storeId as StoreId,
    storeName: value.storeName,
    items,
    subtotalAvoidedInCents: value.subtotalAvoidedInCents,
    categories: [...new Set(categories)],
    urgeRating,
    stillWantsToBuy,
    createdAt: value.createdAt,
  }
}

export function sanitizeHistory(value: unknown): GhostCartHistoryEntry[] {
  if (!Array.isArray(value)) return []

  const entries: GhostCartHistoryEntry[] = []
  const ids = new Set<string>()

  for (const candidate of value) {
    const entry = sanitizeEntry(candidate)
    if (!entry || ids.has(entry.id)) continue
    ids.add(entry.id)
    entries.push(entry)
  }

  return entries.slice(0, MAX_HISTORY_ENTRIES)
}

export function readPersistedHistory(): GhostCartHistoryEntry[] {
  try {
    if (typeof window === 'undefined') return []
    const raw = window.localStorage.getItem(getHistoryStorageKey())
    return raw ? sanitizeHistory(JSON.parse(raw)) : []
  } catch {
    return []
  }
}

/** Read the local history without throwing when storage is unavailable or corrupt. */
export function getHistory(): GhostCartHistoryEntry[] {
  return readPersistedHistory()
}

export function writePersistedHistory(entries: readonly GhostCartHistoryEntry[]): boolean {
  try {
    if (typeof window === 'undefined') return false
    window.localStorage.setItem(getHistoryStorageKey(), JSON.stringify(entries.slice(0, MAX_HISTORY_ENTRIES)))
    return true
  } catch {
    return false
  }
}

/** Append one completed ghost cart to local history. */
export function saveGhostCartSession(entry: GhostCartHistoryEntry): boolean {
  const next = addHistoryEntry(getHistory(), entry)
  return writePersistedHistory(next)
}

export function clearHistory(): boolean {
  try {
    if (typeof window === 'undefined') return false
    window.localStorage.removeItem(getHistoryStorageKey())
    return true
  } catch {
    return false
  }
}

export function getTotalSaved(history: readonly GhostCartHistoryEntry[] = getHistory()): number {
  return history.reduce((total, entry) => total + entry.subtotalAvoidedInCents, 0)
}

export function getFrequentCategories(history: readonly GhostCartHistoryEntry[] = getHistory()): ProductCategory[] {
  const counts = new Map<ProductCategory, number>()

  for (const entry of history) {
    const categories = entry.categories.length > 0 ? entry.categories : entry.items.map((item) => item.category)
    for (const category of categories) counts.set(category, (counts.get(category) ?? 0) + 1)
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category)
}

export function getAverageSavedAmount(history: readonly GhostCartHistoryEntry[] = getHistory()): number {
  return history.length === 0 ? 0 : Math.round(getTotalSaved(history) / history.length)
}

export function getMostUsedMode(history: readonly GhostCartHistoryEntry[] = getHistory()): AppMode | null {
  if (history.length === 0) return null

  const counts = new Map<AppMode, number>()
  for (const entry of history) counts.set(entry.mode, (counts.get(entry.mode) ?? 0) + 1)

  return history.reduce<AppMode | null>((mostUsed, entry) => {
    if (!mostUsed) return entry.mode
    return (counts.get(entry.mode) ?? 0) > (counts.get(mostUsed) ?? 0) ? entry.mode : mostUsed
  }, null)
}

export function getSimpleRecommendations(
  history: readonly GhostCartHistoryEntry[],
  products: readonly Product[],
  excludedProductIds: readonly string[] = [],
): Product[] {
  const excluded = new Set(excludedProductIds)
  const available = products.filter((product) => !excluded.has(product.id))
  if (available.length === 0) return []
  if (history.length === 0) return available.slice(0, 6)

  const frequentCategories = getFrequentCategories(history)
  const categoryRank = new Map(frequentCategories.map((category, index) => [category, frequentCategories.length - index]))
  const average = getAverageSavedAmount(history)
  const mostUsedMode = getMostUsedMode(history)

  const score = (product: Product, index: number) => {
    const categoryScore = (categoryRank.get(product.category) ?? 0) * 100
    const modeScore = product.mode === mostUsedMode ? 20 : 0
    const distance = average > 0 ? Math.abs(product.priceInCents - average) / average : 1
    const ticketScore = Math.max(0, 80 - distance * 80)
    const defaultOrderScore = Math.max(0, 10 - index / 10)
    return categoryScore + modeScore + ticketScore + defaultOrderScore
  }

  return available
    .map((product, index) => ({ product, score: score(product, index) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(({ product }) => product)
}

export function addHistoryEntry(
  entries: readonly GhostCartHistoryEntry[],
  entry: GhostCartHistoryEntry,
): GhostCartHistoryEntry[] {
  if (entries.some((existing) => existing.id === entry.id)) return [...entries]
  return [entry, ...entries].slice(0, MAX_HISTORY_ENTRIES)
}
