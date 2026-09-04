import { Button } from '../components/Button'
import { ProductVisual } from '../components/ProductVisual'
import { stores } from '../data'
import { formatPen } from '../lib/money'
import type { CartItem } from '../types/product'

type CartScreenProps = {
  items: CartItem[]
  itemCount: number
  subtotal: number
  storageAvailable: boolean
  notice?: string | null
  onBack: () => void
  onContinue: () => void
  onClear: () => void
  onIncrement: (productId: string) => void
  onDecrement: (productId: string) => void
  onRemove: (productId: string) => void
  onCheckout: () => void
}

export function CartScreen({ items, itemCount, subtotal, storageAvailable, notice, onBack, onContinue, onClear, onIncrement, onDecrement, onRemove, onCheckout }: CartScreenProps) {
  const storeNameById = new Map(stores.map((store) => [store.id, store.name]))

  return (
    <section className="mx-auto max-w-5xl space-y-4 py-1 sm:py-4">
      <button className="inline-flex min-h-11 items-center text-sm font-black text-ghost-plum hover:text-ghost-plumDark" onClick={onBack} type="button">← Volver</button>
      <header className="flex items-end justify-between gap-3 border-b border-ghost-line pb-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.12em] text-ghost-coral">Compra simulada</p>
          <h1 className="mt-1 text-3xl font-black tracking-[-0.04em] text-ghost-ink sm:text-4xl">Carrito fantasma</h1>
        </div>
        <span className="pb-1 text-xs font-black text-ghost-muted">{itemCount} {itemCount === 1 ? 'producto' : 'productos'}</span>
      </header>

      {!storageAvailable && <p className="rounded-xl border border-ghost-sand bg-ghost-sunSoft p-3 text-sm leading-5 text-ghost-ink">No pudimos guardar este carrito en el dispositivo. Seguirá disponible mientras esta pestaña esté abierta.</p>}

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ghost-line bg-white p-7 text-center shadow-market sm:p-10">
          <div aria-hidden="true" className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-ghost-sunSoft text-3xl">🛒</div>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-ghost-ink">Tu carrito está vacío</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-ghost-muted">Agrega algo desde el catálogo y arma tu compra imaginaria.</p>
          <Button className="mt-5 w-full sm:w-auto" onClick={onContinue}>Explorar productos</Button>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1fr_340px] lg:items-start">
          <div className="overflow-hidden rounded-2xl border border-ghost-line bg-white shadow-market">
            {items.map((item, index) => (
              <article key={item.productId} className={`p-3.5 sm:p-4 ${index > 0 ? 'border-t border-ghost-line' : ''}`}>
                <div className="flex gap-3">
                  <ProductVisual category={item.category} className="h-[76px] w-[76px] shrink-0 rounded-xl sm:h-24 sm:w-24" name={item.name} showLabel={false} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.1em] text-ghost-muted">{storeNameById.get(item.storeId) ?? 'Tienda ficticia'}</p>
                    <h2 className="mt-0.5 text-sm font-black leading-[1.15rem] text-ghost-ink sm:text-base">{item.name}</h2>
                    <p className="mt-1 text-xs font-bold text-ghost-plum">{formatPen(item.unitPriceInCents)} c/u</p>
                    <div className="mt-2 flex items-center gap-1.5" aria-label={`Cantidad de ${item.name}`}>
                      <button aria-label={`Disminuir cantidad de ${item.name}`} className="flex h-9 w-9 items-center justify-center rounded-lg border border-ghost-line bg-ghost-mist text-lg font-black text-ghost-ink disabled:cursor-not-allowed disabled:opacity-40" disabled={item.quantity <= 1} onClick={() => onDecrement(item.productId)} type="button">−</button>
                      <span aria-live="polite" className="min-w-8 text-center text-sm font-black text-ghost-ink">{item.quantity}</span>
                      <button aria-label={`Aumentar cantidad de ${item.name}`} className="flex h-9 w-9 items-center justify-center rounded-lg border border-ghost-line bg-ghost-mist text-lg font-black text-ghost-ink" onClick={() => onIncrement(item.productId)} type="button">+</button>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end justify-between gap-2">
                    <p className="text-sm font-black text-ghost-ink sm:text-base">{formatPen(item.unitPriceInCents * item.quantity)}</p>
                    <button className="min-h-10 px-1 text-xs font-bold text-ghost-coral hover:underline" onClick={() => onRemove(item.productId)} type="button">Eliminar</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="rounded-2xl border border-ghost-line bg-white p-4 shadow-market lg:sticky lg:top-24">
            <h2 className="text-lg font-black text-ghost-ink">Resumen del carrito</h2>
            <div className="mt-3 flex items-end justify-between gap-3 border-y border-ghost-line py-3">
              <span className="text-sm font-semibold text-ghost-muted">Subtotal imaginario</span>
              <span className="text-2xl font-black text-ghost-ink">{formatPen(subtotal)}</span>
            </div>
            <p className="mt-3 text-xs leading-5 text-ghost-muted">Nada será cobrado. El monto solo calcula cuánto decides no gastar aquí.</p>
            <Button className="mt-4 w-full" onClick={onCheckout}>Ir al checkout falso</Button>
            <Button className="mt-2 w-full" onClick={onContinue} variant="secondary">Seguir explorando</Button>
            <button className="mx-auto mt-2 block min-h-10 px-3 text-xs font-bold text-ghost-coral hover:underline" onClick={onClear} type="button">Vaciar carrito</button>
            {notice && <p aria-live="polite" className="mt-3 rounded-lg bg-ghost-mint p-3 text-center text-sm font-semibold leading-5 text-ghost-teal">{notice}</p>}
          </aside>
        </div>
      )}
    </section>
  )
}
