import { Button } from '../components/Button'
import { SimulationBadge } from '../components/SimulationBadge'
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
  const modeLabel = mode === 'food' ? 'tu antojo' : 'tu compra'

  return (
    <section className="mx-auto max-w-2xl space-y-6 py-4 sm:py-10">
      <button className="text-sm font-bold text-ghost-teal hover:text-ghost-tealDark" onClick={onBack} type="button">
        ← Cambiar modo
      </button>
      <div>
        <SimulationBadge />
        <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-ghost-coral">Paso 2 · elegir tienda</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-ghost-ink">Dale un escenario a {modeLabel}.</h1>
        <p className="mt-4 max-w-xl leading-7 text-ghost-muted">Todas las tiendas son ficticias. Escoge la que más se parezca a lo que te estaba tentando hoy.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {modeStores.map((store) => (
          <StoreCard
            key={store.id}
            onClick={() => onSelect(store)}
            productCount={products.filter((product) => product.storeId === store.id).length}
            store={store}
          />
        ))}
      </div>
      <Button className="w-full sm:w-auto" onClick={onBack} variant="secondary">
        Volver a modos
      </Button>
    </section>
  )
}
