import { sanitizeCart } from './cart'
import type { RitualSnapshot } from '../types/ritual'
import type { GhostCartHistoryEntry } from '../types/history'
const KEY = 'carrito-fantasma:v2:checkout'
export function newOrderId() {
  return crypto.randomUUID()
}
export function writeCheckout(snapshot: RitualSnapshot | null): boolean {
  try {
    if (snapshot) localStorage.setItem(KEY, JSON.stringify(snapshot))
    else localStorage.removeItem(KEY)
    return true
  } catch {
    return false
  }
}
export function readCheckout(): RitualSnapshot | null {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? 'null')
    if (
      !raw ||
      typeof raw.id !== 'string' ||
      typeof raw.createdAt !== 'string' ||
      !Number.isFinite(Date.parse(raw.createdAt))
    )
      return null
    const items = sanitizeCart(raw.items)
    if (
      !items.length ||
      !['shopping', 'food'].includes(raw.mode) ||
      items.some((item) => item.storeId !== raw.storeId)
    )
      return null
    const total = items.reduce(
      (sum, item) => sum + item.unitPriceInCents * item.quantity,
      0,
    )
    if (!Number.isSafeInteger(total)) return null
    return {
      id: raw.id,
      createdAt: raw.createdAt,
      items,
      mode: raw.mode,
      storeId: items[0].storeId,
      storeName:
        typeof raw.storeName === 'string' ? raw.storeName : 'FlashMarket',
      subtotalInCents: total,
      initialUrgeRating: [1, 2, 3, 4, 5].includes(raw.initialUrgeRating)
        ? raw.initialUrgeRating
        : undefined,
    }
  } catch {
    return null
  }
}
export function orderEntry(snapshot: RitualSnapshot): GhostCartHistoryEntry {
  return {
    id: snapshot.id,
    date: snapshot.createdAt.slice(0, 10),
    createdAt: snapshot.createdAt,
    mode: snapshot.mode,
    storeId: snapshot.storeId,
    storeName: snapshot.storeName,
    items: snapshot.items.map((item) => ({ ...item })),
    categories: [...new Set(snapshot.items.map((item) => item.category))],
    subtotalAvoidedInCents: snapshot.subtotalInCents,
    initialUrgeRating: snapshot.initialUrgeRating,
  }
}
