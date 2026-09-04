import { useMemo, useState } from 'react'
import { Button } from '../components/Button'
import { ProductCard } from '../components/ProductCard'
import { SimulationBadge } from '../components/SimulationBadge'
import { productCategoryLabels, products } from '../data'
import type { AppMode, Product, ProductCategory, Store } from '../types/product'

type CatalogScreenProps = {
  mode: AppMode
  store: Store
  onBack: () => void
  onOpenProduct: (product: Product) => void
}

export function CatalogScreen({ mode, store, onBack, onOpenProduct }: CatalogScreenProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all')
  const storeProducts = useMemo(
    () => products.filter((product) => product.mode === mode && product.storeId === store.id),
    [mode, store.id],
  )
  const categories = useMemo(
    () => store.categories.filter((category) => storeProducts.some((product) => product.category === category)),
    [store.categories, storeProducts],
  )
  const visibleProducts = activeCategory === 'all'
    ? storeProducts
    : storeProducts.filter((product) => product.category === activeCategory)

  return (
    <section className="space-y-6 py-4 sm:py-10">
      <div className="flex items-center justify-between gap-3">
        <button className="text-sm font-bold text-ghost-teal hover:text-ghost-tealDark" onClick={onBack} type="button">
          ← Cambiar tienda
        </button>
        <SimulationBadge />
      </div>
      <header className="overflow-hidden rounded-[2rem] border border-ghost-line bg-white shadow-card">
        <div className="flex items-center gap-4 p-5 sm:p-7">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-3xl bg-ghost-mist sm:h-24 sm:w-24">
            <img alt="" aria-hidden="true" className="h-full w-full object-cover" src={store.imageUrl} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ghost-coral">Catálogo ficticio</p>
            <h1 className="mt-1 text-3xl font-black tracking-[-0.04em] text-ghost-ink">{store.name}</h1>
            <p className="mt-2 text-sm leading-6 text-ghost-muted">{store.description}</p>
          </div>
        </div>
        <div className="border-t border-ghost-line bg-ghost-mist/70 px-5 py-3 text-sm font-semibold text-ghost-teal sm:px-7">
          Explora sin prisa. Aquí ningún producto puede llegar a tu casa.
        </div>
      </header>
      <div className="space-y-3" aria-label="Filtrar productos" role="group">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-black tracking-tight text-ghost-ink">Elige algo para imaginar</h2>
          <span className="text-xs font-semibold text-ghost-muted">{visibleProducts.length} opciones</span>
        </div>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="list">
          <button
            aria-pressed={activeCategory === 'all'}
            className={`min-h-10 shrink-0 rounded-full border px-4 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ghost-teal ${activeCategory === 'all' ? 'border-ghost-teal bg-ghost-teal text-white' : 'border-ghost-line bg-white text-ghost-muted hover:border-ghost-mintStrong hover:text-ghost-ink'}`}
            onClick={() => setActiveCategory('all')}
            type="button"
          >
            Todo
          </button>
          {categories.map((category) => (
            <button
              key={category}
              aria-pressed={activeCategory === category}
              className={`min-h-10 shrink-0 rounded-full border px-4 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ghost-teal ${activeCategory === category ? 'border-ghost-teal bg-ghost-teal text-white' : 'border-ghost-line bg-white text-ghost-muted hover:border-ghost-mintStrong hover:text-ghost-ink'}`}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {productCategoryLabels[category]}
            </button>
          ))}
        </div>
      </div>
      {visibleProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              categoryLabel={productCategoryLabels[product.category]}
              onClick={() => onOpenProduct(product)}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-ghost-line bg-white p-8 text-center">
          <p className="font-bold text-ghost-ink">Todavía no hay productos en esta categoría.</p>
          <Button className="mt-4" onClick={() => setActiveCategory('all')} variant="secondary">
            Ver todo el catálogo
          </Button>
        </div>
      )}
    </section>
  )
}
