import { Button } from '../components/Button'
import { SimulationBadge } from '../components/SimulationBadge'
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

export function CartScreen({
  items,
  itemCount,
  subtotal,
  storageAvailable,
  notice,
  onBack,
  onContinue,
  onClear,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
}: CartScreenProps) {
  const storeNameById = new Map(stores.map((store) => [store.id, store.name]))

  return (
    <section className="mx-auto max-w-2xl space-y-6 py-4 sm:py-10">
      <div className="flex items-center justify-between gap-3">
        <button className="text-sm font-bold text-ghost-teal hover:text-ghost-tealDark" onClick={onBack} type="button">
          ← Volver
        </button>
        <SimulationBadge />
      </div>
      <header>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-ghost-coral">Tu pausa en progreso</p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <h1 className="text-4xl font-black tracking-[-0.04em] text-ghost-ink">Carrito fantasma</h1>
          <span className="pb-1 text-sm font-bold text-ghost-muted">{itemCount} {itemCount === 1 ? 'producto' : 'productos'}</span>
        </div>
        <p className="mt-3 leading-7 text-ghost-muted">Mira lo que elegiste y cambia las cantidades sin prisa. Este carrito no compra ni envía nada.</p>
      </header>

      {!storageAvailable && (
        <p className="rounded-2xl border border-ghost-sand bg-ghost-sand/70 p-4 text-sm leading-6 text-ghost-ink">
          No pudimos guardar este carrito en el dispositivo. Seguirá disponible mientras esta pestaña esté abierta.
        </p>
      )}

      {items.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-ghost-line bg-white p-8 text-center shadow-card sm:p-10">
          <div aria-hidden="true" className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-ghost-mint text-4xl text-ghost-teal">◌</div>
          <h2 className="mt-6 text-2xl font-black tracking-tight text-ghost-ink">Tu carrito está flotando vacío</h2>
          <p className="mx-auto mt-3 max-w-sm leading-7 text-ghost-muted">Agrega algo desde el catálogo y dale forma a tu compra imaginaria.</p>
          <Button className="mt-7 w-full sm:w-auto" onClick={onContinue}>
            Explorar productos
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {items.map((item) => (
              <article key={item.productId} className="rounded-3xl border border-ghost-line bg-white p-4 shadow-card">
                <div className="flex gap-3">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-ghost-mist">
                    <img alt="" aria-hidden="true" className="h-full w-full object-cover" src={item.imageUrl} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-ghost-muted">{storeNameById.get(item.storeId) ?? 'Tienda ficticia'}</p>
                    <h2 className="mt-1 text-base font-black leading-5 text-ghost-ink">{item.name}</h2>
                    <p className="mt-1 text-sm font-bold text-ghost-teal">{formatPen(item.unitPriceInCents)} cada uno</p>
                  </div>
                  <p className="shrink-0 text-right text-base font-black text-ghost-ink">{formatPen(item.unitPriceInCents * item.quantity)}</p>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-ghost-line pt-3">
                  <div className="flex items-center gap-2" aria-label={`Cantidad de ${item.name}`}>
                    <button
                      aria-label={`Disminuir cantidad de ${item.name}`}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-ghost-line bg-ghost-mist text-lg font-black text-ghost-ink transition hover:border-ghost-mintStrong disabled:cursor-not-allowed disabled:opacity-40"
                      disabled={item.quantity <= 1}
                      onClick={() => onDecrement(item.productId)}
                      type="button"
                    >
                      −
                    </button>
                    <span aria-live="polite" className="min-w-8 text-center text-sm font-black text-ghost-ink">{item.quantity}</span>
                    <button
                      aria-label={`Aumentar cantidad de ${item.name}`}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-ghost-line bg-ghost-mist text-lg font-black text-ghost-ink transition hover:border-ghost-mintStrong"
                      onClick={() => onIncrement(item.productId)}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                  <button className="min-h-10 rounded-xl px-3 text-sm font-bold text-ghost-coral transition hover:bg-ghost-coralSoft" onClick={() => onRemove(item.productId)} type="button">
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="rounded-[2rem] border border-ghost-line bg-white p-5 shadow-card sm:p-6">
            <div className="flex items-center justify-between gap-4 text-sm text-ghost-muted">
              <span>Subtotal imaginario</span>
              <span className="text-2xl font-black text-ghost-ink">{formatPen(subtotal)}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-ghost-muted">Nada será cobrado. El monto solo sirve para mostrarte cuánto decidiste no gastar aquí.</p>
            <Button className="mt-6 w-full" onClick={onCheckout}>
              Ir al checkout falso
            </Button>
            <Button className="mt-3 w-full" onClick={onContinue} variant="secondary">
              Seguir explorando
            </Button>
            <button className="mx-auto mt-4 block min-h-10 px-3 text-sm font-bold text-ghost-coral hover:underline" onClick={onClear} type="button">
              Vaciar carrito
            </button>
            {notice && (
              <p aria-live="polite" className="mt-3 rounded-2xl bg-ghost-mint/70 p-3 text-center text-sm font-semibold leading-5 text-ghost-teal">
                {notice}
              </p>
            )}
          </div>
        </>
      )}
    </section>
  )
}
