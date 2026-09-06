import { useLayoutEffect, useState } from 'react'
import type { StoreId } from '../types/product'

export type ShopRoute = {
  screen: 'catalog' | 'product' | 'cart' | 'checkout' | 'result' | 'history'
  storeId: StoreId
  productId?: string
  query?: string
  category?: string
  sort?: string
  favorites?: boolean
}
const storeIds = [
  'flash-market',
  'todo-innecesario',
  'wishlist-club',
  'antojo-go',
]
export function parseRoute(hash: string): ShopRoute {
  const [path, search] = hash.replace(/^#\/?/, '').split('?')
  const [store, screen, id] = path.split('/')
  const params = new URLSearchParams(search)
  let productId: string | undefined
  try {
    productId = id ? decodeURIComponent(id) : undefined
  } catch {
    productId = undefined
  }
  return {
    storeId: storeIds.includes(store) ? (store as StoreId) : 'flash-market',
    screen: ['product', 'cart', 'checkout', 'result', 'history'].includes(
      screen,
    )
      ? (screen as ShopRoute['screen'])
      : 'catalog',
    productId,
    query: params.get('q') ?? '',
    category: params.get('category') ?? 'all',
    sort: params.get('sort') ?? 'featured',
    favorites: params.get('favorites') === '1',
  }
}
function routeHash(route: ShopRoute) {
  const params = new URLSearchParams()
  if (route.query) params.set('q', route.query)
  if (route.category && route.category !== 'all')
    params.set('category', route.category)
  if (route.sort && route.sort !== 'featured') params.set('sort', route.sort)
  if (route.favorites) params.set('favorites', '1')
  return `#/${route.storeId}/${route.screen}${route.productId ? `/${encodeURIComponent(route.productId)}` : ''}${params.size ? `?${params}` : ''}`
}
const positions = new Map<string, number>()
export function useShopRoute() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash))
  useLayoutEffect(() => {
    const update = () => setRoute(parseRoute(window.location.hash))
    window.addEventListener('popstate', update)
    window.addEventListener('hashchange', update)
    return () => {
      window.removeEventListener('popstate', update)
      window.removeEventListener('hashchange', update)
    }
  }, [])
  const key = routeHash(route)
  useLayoutEffect(() => {
    window.scrollTo(0, positions.get(key) ?? 0)
    const remember = () => positions.set(key, window.scrollY)
    window.addEventListener('scroll', remember, { passive: true })
    return () => window.removeEventListener('scroll', remember)
  }, [key])
  function navigate(next: ShopRoute, replace = false) {
    positions.set(key, window.scrollY)
    if (replace) positions.set(routeHash(next), window.scrollY)
    window.history[replace ? 'replaceState' : 'pushState'](
      null,
      '',
      routeHash(next),
    )
    setRoute(next)
  }
  return { route, navigate }
}
