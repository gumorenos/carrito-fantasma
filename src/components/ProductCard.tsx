import { formatPen } from '../lib/money'
import type { Product } from '../types/product'

type ProductCardProps = {
  product: Product
  categoryLabel: string
  onClick: () => void
}

export function ProductCard({ product, categoryLabel, onClick }: ProductCardProps) {
  return (
    <button
      aria-label={`Ver detalle de ${product.name}`}
      className="group flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] border border-ghost-line bg-white text-left shadow-card transition hover:-translate-y-0.5 hover:border-ghost-mintStrong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ghost-teal"
      onClick={onClick}
      type="button"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ghost-mist">
        <img
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          src={product.imageUrl}
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-ghost-teal shadow-sm">
          {categoryLabel}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h2 className="text-base font-black leading-5 tracking-tight text-ghost-ink">{product.name}</h2>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-ghost-muted">{product.description}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <span className="text-lg font-black text-ghost-ink">{formatPen(product.priceInCents)}</span>
          <span aria-hidden="true" className="text-lg font-bold text-ghost-teal">+</span>
        </div>
      </div>
    </button>
  )
}
