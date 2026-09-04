import type { Store } from '../types/product'

type StoreCardProps = {
  store: Store
  productCount: number
  onClick: () => void
}

export function StoreCard({ store, productCount, onClick }: StoreCardProps) {
  return (
    <button
      aria-label={`Entrar a ${store.name}`}
      className="group flex min-h-40 w-full flex-col overflow-hidden rounded-[1.75rem] border border-ghost-line bg-white text-left shadow-card transition hover:-translate-y-0.5 hover:border-ghost-mintStrong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ghost-teal"
      onClick={onClick}
      type="button"
    >
      <div className="flex items-center gap-4 p-4 pb-3">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl"
          style={{ backgroundColor: `${store.accentColor}1A` }}
        >
          <img alt="" aria-hidden="true" className="h-full w-full object-cover" src={store.imageUrl} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ghost-muted">Tienda ficticia</p>
          <h2 className="mt-1 text-lg font-black tracking-tight text-ghost-ink">{store.name}</h2>
          <p className="mt-1 text-xs font-semibold text-ghost-teal">{store.tagline}</p>
        </div>
        <span aria-hidden="true" className="self-start text-lg text-ghost-teal transition group-hover:translate-x-0.5">↗</span>
      </div>
      <div className="mt-auto border-t border-ghost-line px-4 py-3 text-xs leading-5 text-ghost-muted">
        <span>{store.description}</span>
        <span className="mt-1 block font-bold text-ghost-ink">{productCount} productos para imaginar</span>
      </div>
    </button>
  )
}
