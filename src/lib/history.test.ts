import { describe, expect, it } from 'vitest'
import { addHistoryEntry, getSimpleRecommendations, getTotalSaved } from './history'
import type { GhostCartHistoryEntry } from '../types/history'
import type { CartItem, Product, ProductCategory } from '../types/product'

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 'product-test',
    mode: 'shopping',
    storeId: 'flash-market',
    name: 'Producto de prueba',
    description: 'Producto ficticio para pruebas.',
    category: 'gadgets',
    priceInCents: 7990,
    currency: 'PEN',
    tags: ['prueba'],
    imageUrl: '/product-placeholder.svg',
    impulseType: 'curiosidad',
    ...overrides,
  }
}

function makeEntry(id: string, subtotalAvoidedInCents: number, category: ProductCategory = 'gadgets'): GhostCartHistoryEntry {
  const product = makeProduct({ id: `${id}-product`, category })
  const item: CartItem = {
    productId: product.id,
    storeId: product.storeId,
    name: product.name,
    category: product.category,
    unitPriceInCents: product.priceInCents,
    currency: 'PEN',
    imageUrl: product.imageUrl,
    quantity: 1,
    addedAt: '2026-09-04T00:00:00.000Z',
  }
  return {
    id,
    date: '2026-09-04',
    mode: 'shopping',
    storeId: 'flash-market',
    storeName: 'Tienda ficticia',
    items: [item],
    subtotalAvoidedInCents,
    categories: [category],
    createdAt: '2026-09-04T00:00:00.000Z',
  }
}

describe('history helpers', () => {
  it('does not duplicate an entry with the same id', () => {
    const existing = makeEntry('same-id', 7990)
    const duplicate = { ...existing, subtotalAvoidedInCents: 12990 }

    expect(addHistoryEntry([existing], duplicate)).toEqual([existing])
    expect(addHistoryEntry([existing], makeEntry('new-id', 1890)).map((entry) => entry.id)).toEqual(['new-id', 'same-id'])
  })

  it('sums saved amounts', () => {
    expect(getTotalSaved([makeEntry('one', 7990), makeEntry('two', 1890)])).toBe(9880)
  })

  it('prioritizes frequent categories and nearby tickets while excluding current items', () => {
    const excluded = makeProduct({ id: 'already-in-cart', priceInCents: 7990 })
    const close = makeProduct({ id: 'recommended-close', priceInCents: 7990 })
    const far = makeProduct({ id: 'recommended-far', priceInCents: 29900 })
    const food = makeProduct({ id: 'food-option', mode: 'food', storeId: 'antojo-go', category: 'postres', priceInCents: 1890 })

    const recommendations = getSimpleRecommendations(
      [makeEntry('history-one', 7990, 'gadgets')],
      [excluded, close, far, food],
      [excluded.id],
    )

    expect(recommendations[0]?.id).toBe(close.id)
    expect(recommendations.some((product) => product.id === excluded.id)).toBe(false)
  })
})
