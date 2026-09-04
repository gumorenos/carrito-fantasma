import { StoreCard } from '../components/StoreCard'
import { products, stores } from '../data'
import type { AppMode, Store } from '../types/product'

type StoreSelectorScreenProps = {
  mode: AppMode
  onBack: () => void
  onSelect: (store: Store) => void
}

export function StoreSelectorScreen({ mode, onBack, onSelect }: StoreSelectorScreenProps) {
  const modeStores = stores.filter((store) => store.mode === mode)

  return (
    <section className="space-y-5 py-1 sm:py-4">
      <button className="inline-flex min-h-11 items-center text-sm font-black text-ghost-plum hover:text-ghost-plumDark" onClick={onBack} type="button">← Cambiar modo</button>
      <header className="flex flex-col gap-2 border-b border-ghost-line pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-ghost-coral">Tiendas ficticias</p>
          <h1 className="mt-1 text-3xl font-black tracking-[-0.04em] text-ghost-ink">{mode === 'food' ? '¿De dónde viene el antojo?' : 'Elige dónde explorar'}</h1>
        </div>
        <p className="max-w-md text-sm leading-5 text-ghost-muted">Todo se ve familiar, pero nada se vende ni llega a tu puerta.</p>
      </header>
      <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 ${mode === 'food' ? 'max-w-[270px]' : ''}`}>
        {modeStores.map((store) => (
          <StoreCard key={store.id} onClick={() => onSelect(store)} productCount={products.filter((product) => product.storeId === store.id).length} store={store} />
        ))}
      </div>
    </section>
  )
}
