import { useCallback, useEffect, useState } from 'react'
import {
  addItem as addCartItem,
  clearCart as clearCartItems,
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
  const [storageAvailable] = useState(canUseLocalStorage)

  useEffect(() => {
    writePersistedCart(items)
  }, [items])

  const addItem = useCallback((product: Product) => {
    setItems((current) => addCartItem(current, product))
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((current) => removeCartItem(current, productId))
  }, [])

  const incrementItem = useCallback((productId: string) => {
    setItems((current) => incrementCartItem(current, productId))
  }, [])

  const decrementItem = useCallback((productId: string) => {
    setItems((current) => decrementCartItem(current, productId))
  }, [])

  const clearCart = useCallback(() => {
    setItems(clearCartItems())
  }, [])

  const getCartSubtotalValue = useCallback(() => getCartSubtotal(items), [items])

  return {
    items,
    itemCount: getCartItemCount(items),
    subtotal: getCartSubtotalValue(),
    storageAvailable,
    addItem,
    removeItem,
    incrementItem,
    decrementItem,
    clearCart,
    getCartSubtotal: getCartSubtotalValue,
  }
}
