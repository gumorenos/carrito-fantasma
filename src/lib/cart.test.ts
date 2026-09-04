import { describe, expect, it } from 'vitest'
import {
  MAX_CART_ITEM_QUANTITY,
  MAX_CART_TOTAL_ITEMS,
  addItem,
  decrementItem,
  getCartItemCount,
  getCartSubtotal,
  incrementItem,
  sanitizeCart,
} from './cart'
import type { CartItem, Product } from '../types/product'

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

function makeCartItem(product: Product, quantity = 1): CartItem {
  return {
    productId: product.id,
    storeId: product.storeId,
    name: product.name,
    category: product.category,
    unitPriceInCents: product.priceInCents,
    currency: 'PEN',
    imageUrl: product.imageUrl,
    quantity,
    addedAt: '2026-09-04T00:00:00.000Z',
  }
}

describe('cart rules', () => {
  it('calculates a subtotal using unit price and quantity', () => {
    const product = makeProduct()
    expect(getCartSubtotal([makeCartItem(product, 2)])).toBe(15980)
  })

  it('adds, increments and decrements without crossing quantity limits', () => {
    const product = makeProduct()
    let items = addItem([], product)
    expect(items[0]?.quantity).toBe(1)

    for (let index = 1; index < MAX_CART_ITEM_QUANTITY + 3; index += 1) {
      items = incrementItem(items, product.id)
    }
    expect(items[0]?.quantity).toBe(MAX_CART_ITEM_QUANTITY)

    items = decrementItem(items, product.id)
    expect(items[0]?.quantity).toBe(MAX_CART_ITEM_QUANTITY - 1)
    for (let index = 0; index < MAX_CART_ITEM_QUANTITY + 3; index += 1) {
      items = decrementItem(items, product.id)
    }
    expect(items[0]?.quantity).toBe(1)
  })

  it('caps the total number of units across products', () => {
    const products = Array.from({ length: 5 }, (_, index) => makeProduct({ id: `product-${index}` }))
    let items: CartItem[] = []

    for (const product of products) {
      for (let index = 0; index < MAX_CART_ITEM_QUANTITY; index += 1) {
        items = addItem(items, product)
      }
    }

    expect(getCartItemCount(items)).toBe(MAX_CART_TOTAL_ITEMS)
    expect(getCartItemCount(incrementItem(items, products[0].id))).toBe(MAX_CART_TOTAL_ITEMS)
  })

  it('ignores corrupt entries, clamps quantities and keeps one store', () => {
    const product = makeProduct()
    const corruptPrice = { ...makeCartItem(product), unitPriceInCents: '7990' }
    const otherStore = { ...makeCartItem(product), productId: 'other-store', storeId: 'antojo-go', category: 'postres' }
    const result = sanitizeCart([
      makeCartItem(product, 4),
      corruptPrice,
      { ...makeCartItem(product), quantity: 999 },
      otherStore,
      { ...makeCartItem(product), quantity: 0 },
    ] as unknown[])

    expect(result).toHaveLength(1)
    expect(result[0]?.productId).toBe(product.id)
    expect(result[0]?.quantity).toBe(MAX_CART_ITEM_QUANTITY)
  })
})
