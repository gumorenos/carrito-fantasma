import { Button } from '../components/Button'
import { SimulationBadge } from '../components/SimulationBadge'
import { productCategoryLabels } from '../data'
import { formatPen } from '../lib/money'
import type { Product, Store } from '../types/product'

type ProductDetailScreenProps = {
  product: Product
  store: Store
  onBack: () => void
  onAddToCart: () => void
  notice?: string | null
}

export function ProductDetailScreen({ product, store, onBack, onAddToCart, notice }: ProductDetailScreenProps) {
  return (
    <section className="mx-auto max-w-2xl space-y-5 py-4 sm:py-10">
      <div className="flex items-center justify-between gap-3">
        <button className="inline-flex min-h-11 items-center text-sm font-bold text-ghost-teal hover:text-ghost-tealDark" onClick={onBack} type="button">
          ← Volver al catálogo
        </button>
        <SimulationBadge />
      </div>
      <article className="overflow-hidden rounded-[2rem] border border-ghost-line bg-white shadow-card">
        <div className="aspect-[4/3] max-h-[22rem] overflow-hidden bg-ghost-mist">
          <img alt={product.name} className="h-full w-full object-cover" src={product.imageUrl} />
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-ghost-mint px-3 py-1 text-xs font-bold text-ghost-teal">{store.name}</span>
            <span className="rounded-full bg-ghost-sand px-3 py-1 text-xs font-bold text-ghost-ink">{productCategoryLabels[product.category]}</span>
          </div>
          <h1 className="mt-4 text-3xl font-black leading-tight tracking-[-0.04em] text-ghost-ink sm:text-4xl">{product.name}</h1>
          <p className="mt-4 text-base leading-7 text-ghost-muted">{product.description}</p>
          <div className="mt-5 flex flex-wrap gap-2" aria-label="Características del producto">
            {product.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-ghost-line px-3 py-1 text-xs font-semibold text-ghost-muted">#{tag}</span>
            ))}
          </div>
          <div className="mt-8 flex items-end justify-between gap-4 border-t border-ghost-line pt-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-ghost-muted">Precio imaginario</p>
              <p className="mt-1 text-3xl font-black tracking-tight text-ghost-ink">{formatPen(product.priceInCents)}</p>
            </div>
            <span className="text-right text-xs font-semibold leading-5 text-ghost-muted">Solo para el ritual<br />sin cobro ni envío</span>
          </div>
          <Button className="mt-7 w-full" onClick={onAddToCart}>
            Agregar al carrito fantasma
          </Button>
          {notice && (
            <p aria-live="polite" className="mt-3 rounded-2xl bg-ghost-mint/70 p-3 text-center text-sm font-semibold leading-5 text-ghost-teal">
              {notice}
            </p>
          )}
        </div>
      </article>
    </section>
  )
}
