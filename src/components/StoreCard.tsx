import type { Store } from '../types/product'
import { StoreVisual } from './StoreVisual'

type StoreCardProps = {
  store: Store
  productCount: number
  onClick: () => void
}

export function StoreCard({ store, productCount, onClick }: StoreCardProps) {
  return (
    <button
      aria-label={`Entrar a ${store.name}`}
      className="group flex h-full min-h-[186px] w-full flex-col overflow-hidden rounded-2xl border border-ghost-line bg-white text-left shadow-market transition hover:-translate-y-0.5 hover:border-ghost-plum/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ghost-plum"
      onClick={onClick}
      type="button"
    >
      <StoreVisual className="h-24 w-full" store={store} />
      <div className="flex flex-1 flex-col p-3.5">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-base font-black leading-5 tracking-tight text-ghost-ink">{store.name}</h2>
          <span aria-hidden="true" className="text-lg font-black text-ghost-plum transition group-hover:translate-x-0.5">›</span>
        </div>
        <p className="mt-1 line-clamp-2 text-[11px] font-semibold leading-4 text-ghost-muted">{store.tagline}</p>
        <p className="mt-auto pt-2 text-[11px] font-black text-ghost-plum">{productCount} productos ficticios</p>
      </div>
    </button>
  )
}
