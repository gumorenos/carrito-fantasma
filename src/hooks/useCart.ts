import { useCallback, useRef, useState } from 'react'
import {
  addItem as addCartItem,
  decrementItem as decrementCartItem,
  getCartItemCount,
  getCartSubtotal,
  incrementItem as incrementCartItem,
  readPersistedCart,
  removeItem as removeCartItem,
  writePersistedCart,
} from '../lib/cart'
import { canUseLocalStorage } from '../lib/storage'
import type { CartItem, Product } from '../types/product'
export function useCart() {
  const [items, setItems] = useState<CartItem[]>(readPersistedCart)
  const current = useRef(items)
  const [storageAvailable, setStorageAvailable] = useState(canUseLocalStorage)
  const update = useCallback((action: (items: CartItem[]) => CartItem[]) => {
    const next = action(current.current)
    const persisted = writePersistedCart(next)
    current.current = next
    setItems(next)
    setStorageAvailable(persisted)
    return persisted
  }, [])
  const addItem = useCallback(
    (product: Product) => update((items) => addCartItem(items, product)),
    [update],
  )
  const removeItem = useCallback(
    (id: string) => update((items) => removeCartItem(items, id)),
    [update],
  )
  const incrementItem = useCallback(
    (id: string) => update((items) => incrementCartItem(items, id)),
    [update],
  )
  const decrementItem = useCallback(
    (id: string) => update((items) => decrementCartItem(items, id)),
    [update],
  )
  const clearCart = useCallback(() => update(() => []), [update])
  return {
    items,
    itemCount: getCartItemCount(items),
    subtotal: getCartSubtotal(items),
    storageAvailable,
    addItem,
    removeItem,
    incrementItem,
    decrementItem,
    clearCart,
  }
}
