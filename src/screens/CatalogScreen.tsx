import { useMemo, useState } from 'react'
import { Button } from '../components/Button'
import { ProductCard } from '../components/ProductCard'
import { StoreVisual } from '../components/StoreVisual'
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
  const storeProducts = useMemo(() => products.filter((product) => product.mode === mode && product.storeId === store.id), [mode, store.id])
  const categories = useMemo(() => store.categories.filter((category) => storeProducts.some((product) => product.category === category)), [store.categories, storeProducts])
  const visibleProducts = activeCategory === 'all' ? storeProducts : storeProducts.filter((product) => product.category === activeCategory)

  return (
    <section className="space-y-4 py-1 sm:py-4">
      <button className="inline-flex min-h-11 items-center text-sm font-black text-ghost-plum hover:text-ghost-plumDark" onClick={onBack} type="button">← Todas las tiendas</button>

      <header className="flex items-center gap-3 rounded-xl border border-ghost-line bg-white p-3 shadow-market sm:p-4">
        <StoreVisual className="h-16 w-16 shrink-0 rounded-xl sm:h-20 sm:w-20" store={store} />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-ghost-coral">Catálogo ficticio</p>
          <h1 className="mt-0.5 truncate text-2xl font-black tracking-[-0.035em] text-ghost-ink sm:text-3xl">{store.name}</h1>
          <p className="mt-1 line-clamp-1 text-xs text-ghost-muted sm:text-sm">{store.description}</p>
        </div>
      </header>

      <div className="border-b border-ghost-line pb-3" aria-label="Filtrar productos" role="group">
        <div className="mb-2 flex items-end justify-between gap-3">
          <h2 className="text-xl font-black tracking-tight text-ghost-ink">Productos para imaginar</h2>
          <span className="shrink-0 text-[11px] font-bold text-ghost-muted">{visibleProducts.length} opciones</span>
        </div>
        <div className="-mx-3 flex gap-1.5 overflow-x-auto px-3 pb-1 sm:mx-0 sm:px-0" role="list">
          <button aria-pressed={activeCategory === 'all'} className={`min-h-10 shrink-0 rounded-lg border px-3 text-xs font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ghost-plum ${activeCategory === 'all' ? 'border-ghost-plum bg-ghost-plum text-white' : 'border-ghost-line bg-white text-ghost-muted hover:border-ghost-plum/30 hover:text-ghost-ink'}`} onClick={() => setActiveCategory('all')} type="button">Todo</button>
          {categories.map((category) => (
            <button key={category} aria-pressed={activeCategory === category} className={`min-h-10 shrink-0 rounded-lg border px-3 text-xs font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ghost-plum ${activeCategory === category ? 'border-ghost-plum bg-ghost-plum text-white' : 'border-ghost-line bg-white text-ghost-muted hover:border-ghost-plum/30 hover:text-ghost-ink'}`} onClick={() => setActiveCategory(category)} type="button">{productCategoryLabels[category]}</button>
          ))}
        </div>
      </div>

      {visibleProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-2.5 min-[430px]:gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {visibleProducts.map((product) => <ProductCard key={product.id} categoryLabel={productCategoryLabels[product.category]} onClick={() => onOpenProduct(product)} product={product} />)}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-ghost-line bg-white p-7 text-center">
          <p className="font-bold text-ghost-ink">Todavía no hay productos en esta categoría.</p>
          <Button className="mt-4" onClick={() => setActiveCategory('all')} variant="secondary">Ver todo el catálogo</Button>
        </div>
      )}
    </section>
  )
}
