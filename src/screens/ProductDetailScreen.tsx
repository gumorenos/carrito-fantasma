import { Button } from '../components/Button'
import { ProductVisual } from '../components/ProductVisual'
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
    <section className="mx-auto max-w-4xl space-y-4 py-1 sm:py-4">
      <button className="inline-flex min-h-11 items-center text-sm font-black text-ghost-plum hover:text-ghost-plumDark" onClick={onBack} type="button">← Volver al catálogo</button>
      <article className="overflow-hidden rounded-2xl border border-ghost-line bg-white shadow-market md:grid md:grid-cols-[1.05fr_0.95fr]">
        <ProductVisual category={product.category} className="aspect-square h-full min-h-[310px] w-full" name={product.name} />
        <div className="flex flex-col p-5 sm:p-7">
          <p className="text-xs font-black uppercase tracking-[0.1em] text-ghost-plum">{store.name} · {productCategoryLabels[product.category]}</p>
          <h1 className="mt-2 text-3xl font-black leading-[1.08] tracking-[-0.04em] text-ghost-ink sm:text-4xl">{product.name}</h1>
          <p className="mt-3 text-sm leading-6 text-ghost-muted sm:text-base">{product.description}</p>
          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold text-ghost-muted" aria-label="Características del producto">
            {product.tags.map((tag) => <span key={tag}>#{tag}</span>)}
          </div>
          <div className="mt-6 border-y border-ghost-line py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-ghost-muted">Precio imaginario</p>
            <p className="mt-1 text-3xl font-black tracking-tight text-ghost-ink">{formatPen(product.priceInCents)}</p>
          </div>
          <div className="mt-auto pt-5">
            <Button className="w-full" onClick={onAddToCart}>Agregar al carrito fantasma</Button>
            <p className="mt-2 text-center text-[11px] font-semibold leading-4 text-ghost-muted">Simulación sin cobro, pago ni envío.</p>
            {notice && <p aria-live="polite" className="mt-3 rounded-lg bg-ghost-mint p-3 text-center text-sm font-semibold leading-5 text-ghost-teal">{notice}</p>}
          </div>
        </div>
      </article>
    </section>
  )
}
