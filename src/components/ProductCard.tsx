import { formatPen } from '../lib/money'
import type { Product } from '../types/product'
import { ProductVisual } from './ProductVisual'

type ProductCardProps = {
  product: Product
  categoryLabel: string
  onClick: () => void
}

export function ProductCard({ product, categoryLabel, onClick }: ProductCardProps) {
  return (
    <button
      aria-label={`Ver detalle de ${product.name}`}
      className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-ghost-line bg-white text-left shadow-market transition hover:-translate-y-0.5 hover:border-ghost-plum/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ghost-plum"
      onClick={onClick}
      type="button"
    >
      <div className="aspect-square overflow-hidden">
        <ProductVisual category={product.category} className="h-full w-full transition duration-300 group-hover:scale-[1.02]" name={product.name} />
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-ghost-muted">{categoryLabel}</p>
        <h2 className="mt-1 line-clamp-2 text-sm font-black leading-[1.15rem] tracking-tight text-ghost-ink">{product.name}</h2>
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <span className="text-base font-black tracking-tight text-ghost-ink">{formatPen(product.priceInCents)}</span>
          <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-lg bg-ghost-sun text-lg font-black leading-none text-ghost-plum">+</span>
        </div>
      </div>
    </button>
  )
}
