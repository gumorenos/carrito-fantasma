import { ProductCard } from '../components/ProductCard'
import { products, stores, productCategoryLabels } from '../data'
import type { Product, Store } from '../types/product'
import type { ShopRoute } from '../hooks/useShopRoute'
type Props = {
  store: Store
  route: ShopRoute
  onChange: (route: ShopRoute) => void
  onStore: (store: Store) => void
  onOpenProduct: (product: Product) => void
  onAdd: (product: Product) => void
  favorites: string[]
  onFavorite: (id: string) => void
  recent: string[]
}
export function CatalogScreen({
  store,
  route,
  onChange,
  onStore,
  onOpenProduct,
  onAdd,
  favorites,
  onFavorite,
  recent,
}: Props) {
  const all = products.filter((product) => product.storeId === store.id)
  const normalize = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  const visible = all.filter(
    (product) =>
      (!route.category ||
        route.category === 'all' ||
        product.category === route.category) &&
      (!route.favorites || favorites.includes(product.id)) &&
      normalize(
        `${product.name} ${product.description} ${product.tags.join(' ')}`,
      ).includes(normalize(route.query ?? '')),
  )
  if (route.sort === 'price-asc')
    visible.sort((a, b) => a.priceInCents - b.priceInCents)
  if (route.sort === 'price-desc')
    visible.sort((a, b) => b.priceInCents - a.priceInCents)
  const categories = [...new Set(all.map((product) => product.category))]
  const recentProducts = recent
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product =>
      Boolean(product && product.storeId === store.id),
    )
    .slice(0, 5)
  const card = (product: Product) => (
    <ProductCard
      key={product.id}
      product={product}
      categoryLabel={productCategoryLabels[product.category]}
      onClick={() => onOpenProduct(product)}
      onAdd={() => onAdd(product)}
      favorite={favorites.includes(product.id)}
      onFavorite={() => onFavorite(product.id)}
    />
  )
  return (
    <section className="space-y-5">
      <nav
        aria-label="Tiendas"
        className="-mx-3 flex gap-2 overflow-x-auto border-b border-ghost-line px-3 pb-3 sm:mx-0 sm:px-0"
      >
        {stores.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onStore(item)}
            aria-current={store.id === item.id ? 'page' : undefined}
            className={`min-h-11 shrink-0 rounded-lg px-4 text-sm font-semibold ${store.id === item.id ? 'bg-ghost-plum text-white' : 'bg-white text-ghost-muted hover:text-ghost-ink'}`}
          >
            {item.name}
          </button>
        ))}
      </nav>
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-ghost-muted">
            {store.mode === 'food'
              ? 'Algo rico para hoy'
              : 'Tecnología, casa y pequeños descubrimientos'}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
            {store.name}
          </h1>
        </div>
        <p className="max-w-md text-sm text-ghost-muted">{store.description}</p>
      </header>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Buscar productos</span>
          <input
            type="search"
            value={route.query ?? ''}
            onChange={(event) =>
              onChange({ ...route, query: event.target.value })
            }
            placeholder={`Buscar en ${store.name}`}
            className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-base outline-none focus:border-ghost-plum focus:ring-2 focus:ring-ghost-plum/15"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <span>Ordenar</span>
          <select
            value={route.sort ?? 'featured'}
            onChange={(event) =>
              onChange({ ...route, sort: event.target.value })
            }
            className="h-12 rounded-lg border border-slate-300 bg-white px-3"
          >
            <option value="featured">Selección de la tienda</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
          </select>
        </label>
      </div>
      <div className="flex flex-wrap gap-2" aria-label="Categorías">
        {['all', ...categories].map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={(route.category ?? 'all') === category}
            onClick={() => onChange({ ...route, category })}
            className={`min-h-10 rounded-full border px-4 text-sm ${(!route.category && category === 'all') || route.category === category ? 'border-ghost-plum bg-ghost-plum text-white' : 'border-ghost-line bg-white'}`}
          >
            {category === 'all'
              ? 'Todo'
              : productCategoryLabels[category as Product['category']]}
          </button>
        ))}
        <button
          type="button"
          aria-pressed={!!route.favorites}
          onClick={() => onChange({ ...route, favorites: !route.favorites })}
          className={`min-h-10 rounded-full border px-4 text-sm ${route.favorites ? 'border-ghost-plum bg-ghost-plum text-white' : 'border-ghost-line bg-white'}`}
        >
          ♡ Favoritos
        </button>
      </div>
      <p className="text-sm text-ghost-muted">
        {visible.length} {visible.length === 1 ? 'producto' : 'productos'}
      </p>
      {visible.length ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {visible.map(card)}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
          <h2 className="text-xl font-semibold">No encontramos productos</h2>
          <p className="mt-2 text-ghost-muted">
            Prueba otra búsqueda o cambia los filtros.
          </p>
          <button
            type="button"
            className="mt-4 min-h-11 font-semibold text-ghost-plum underline"
            onClick={() =>
              onChange({
                storeId: store.id,
                screen: 'catalog',
                category: 'all',
                query: '',
                favorites: false,
              })
            }
          >
            Ver todos los productos
          </button>
        </div>
      )}
      {recentProducts.length > 0 && !route.query && !route.favorites && (
        <section className="border-t border-ghost-line pt-6">
          <h2 className="mb-4 text-xl font-semibold">Vistos recientemente</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {recentProducts.map(card)}
          </div>
        </section>
      )}
    </section>
  )
}
