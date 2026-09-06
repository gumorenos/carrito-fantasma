import { formatPen } from '../lib/money'
import type { Product } from '../types/product'
import { ProductVisual } from './ProductVisual'
type Props = {
  product: Product
  categoryLabel: string
  onClick: () => void
  onAdd?: () => void
  favorite?: boolean
  onFavorite?: () => void
}
export function ProductCard({
  product,
  categoryLabel,
  onClick,
  onAdd,
  favorite,
  onFavorite,
}: Props) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-ghost-line bg-white transition hover:border-slate-400">
      {onFavorite && (
        <button
          aria-label={`${favorite ? 'Quitar de' : 'Guardar en'} favoritos: ${product.name}`}
          aria-pressed={favorite}
          onClick={onFavorite}
          className="absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-sm"
          type="button"
        >
          {favorite ? '♥' : '♡'}
        </button>
      )}
      <button
        onClick={onClick}
        className="text-left"
        type="button"
        aria-label={`Ver detalle de ${product.name}`}
      >
        <ProductVisual
          category={product.category}
          name={product.name}
          imageUrl={product.imageUrl}
          className="aspect-square w-full"
        />
        <div className="px-3 pt-3 sm:px-4">
          <p className="text-xs text-ghost-muted">{categoryLabel}</p>
          <h2 className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold leading-5 sm:text-base">
            {product.name}
          </h2>
        </div>
      </button>
      <div className="mt-auto flex items-center justify-between gap-2 p-3 sm:p-4">
        <span className="text-lg font-bold tracking-tight">
          {formatPen(product.priceInCents)}
        </span>
        {onAdd && (
          <button
            type="button"
            onClick={onAdd}
            aria-label={`Agregar ${product.name}`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-ghost-plum text-xl text-white hover:bg-ghost-plumDark"
          >
            +
          </button>
        )}
      </div>
    </article>
  )
}
