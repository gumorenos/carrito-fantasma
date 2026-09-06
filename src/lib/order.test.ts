import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { products } from '../data'
import { addItem, writePersistedCart, readPersistedCart } from './cart'
import { orderEntry, readCheckout, writeCheckout } from './order'
import {
  readPersistedHistory,
  upsertHistoryEntry,
  writePersistedHistory,
} from './history'
import { parseRoute } from '../hooks/useShopRoute'
import type { RitualSnapshot } from '../types/ritual'
let data: Map<string, string>
beforeEach(() => {
  data = new Map()
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => data.set(key, value),
    removeItem: (key: string) => data.delete(key),
  })
  vi.stubGlobal('window', { localStorage })
})
afterEach(() => vi.unstubAllGlobals())
function snapshot(): RitualSnapshot {
  const product = products[0]
  return {
    id: 'stable-order-id',
    createdAt: '2026-09-06T12:00:00Z',
    mode: 'shopping',
    storeId: product.storeId,
    storeName: 'FlashMarket',
    items: addItem([], product),
    subtotalInCents: product.priceInCents,
  }
}
describe('checkout recovery and history', () => {
  it('restores a checkout and saves confirmation idempotently across a reload', () => {
    const draft = snapshot()
    expect(writeCheckout(draft)).toBe(true)
    const restored = readCheckout()!
    expect(restored).toEqual(draft)
    expect(
      writePersistedHistory(upsertHistoryEntry([], orderEntry(restored))),
    ).toBe(true)
    const reloaded = readPersistedHistory()
    const updated = upsertHistoryEntry(reloaded, {
      ...orderEntry(restored),
      urgeRating: 2,
      stillWantsToBuy: 'no',
    })
    expect(updated).toHaveLength(1)
    expect(writePersistedHistory(updated)).toBe(true)
    expect(readPersistedHistory()[0].urgeRating).toBe(2)
    expect(readPersistedHistory()[0].items).toEqual(draft.items)
  })
  it('reports failed writes and preserves previously stored orders', () => {
    const entry = orderEntry(snapshot())
    writePersistedHistory([entry])
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError')
    })
    expect(writePersistedHistory([])).toBe(false)
    expect(writeCheckout(snapshot())).toBe(false)
    expect(writePersistedCart([])).toBe(false)
    expect(readPersistedHistory()).toEqual([entry])
  })
  it('rejects corrupt checkout data and derives total from validated lines', () => {
    data.set('carrito-fantasma:v2:checkout', '{broken')
    expect(readCheckout()).toBeNull()
    writeCheckout({ ...snapshot(), subtotalInCents: 1 })
    expect(readCheckout()?.subtotalInCents).toBe(products[0].priceInCents)
  })
  it('preserves distinct configured items through persistence', () => {
    const dish = products.find((product) => product.mode === 'food')!
    let cart = addItem([], {
      ...dish,
      id: `${dish.id}::cutlery`,
      name: `${dish.name} · Con cubiertos`,
    })
    cart = addItem(cart, {
      ...dish,
      id: `${dish.id}::no-cutlery`,
      name: `${dish.name} · Sin cubiertos`,
    })
    writePersistedCart(cart)
    expect(readPersistedCart()).toHaveLength(2)
  })
})
describe('store navigation', () => {
  it('restores product links with their catalog filters', () => {
    expect(
      parseRoute(
        '#/flash-market/product/catalog-99?q=parlante&category=tecnolog%C3%ADa&sort=price-asc&favorites=1',
      ),
    ).toEqual({
      storeId: 'flash-market',
      screen: 'product',
      productId: 'catalog-99',
      query: 'parlante',
      category: 'tecnología',
      sort: 'price-asc',
      favorites: true,
    })
  })
  it('does not crash on malformed or unknown URLs', () => {
    expect(parseRoute('#/missing/product/%E0%A4%A').productId).toBeUndefined()
    expect(parseRoute('#/missing/unknown').storeId).toBe('flash-market')
    expect(parseRoute('#/missing/unknown').screen).toBe('catalog')
  })
})
