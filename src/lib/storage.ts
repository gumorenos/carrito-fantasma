const HISTORY_KEY = 'carrito-fantasma:v1:history'
const CART_KEY = 'carrito-fantasma:v1:cart'

export function canUseLocalStorage(): boolean {
  try {
    const probeKey = 'carrito-fantasma:storage-probe'
    window.localStorage.setItem(probeKey, 'ok')
    window.localStorage.removeItem(probeKey)
    return true
  } catch {
    return false
  }
}

export function getHistoryStorageKey(): string {
  return HISTORY_KEY
}

export function getCartStorageKey(): string {
  return CART_KEY
}
