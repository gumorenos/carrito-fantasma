import { Button } from '../components/Button'
import { SimulationBadge } from '../components/SimulationBadge'
import { formatPen } from '../lib/money'
import type { RitualSnapshot } from '../types/ritual'

type CheckoutScreenProps = {
  snapshot: RitualSnapshot
  onBack: () => void
  onConfirm: () => void
}

export function CheckoutScreen({ snapshot, onBack, onConfirm }: CheckoutScreenProps) {
  return (
    <section className="mx-auto max-w-2xl space-y-6 py-4 sm:py-10">
      <div className="flex items-center justify-between gap-3">
        <button className="inline-flex min-h-11 items-center text-sm font-bold text-ghost-teal hover:text-ghost-tealDark" onClick={onBack} type="button">
          ← Volver al carrito
        </button>
        <SimulationBadge />
      </div>
      <header>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-ghost-coral">Paso 1 · checkout falso</p>
        <h1 className="mt-2 text-4xl font-black tracking-[-0.04em] text-ghost-ink">Confirma tu compra fantasma</h1>
        <p className="mt-3 leading-7 text-ghost-muted">Un último paso para cerrar el ritual. No hay compra real detrás de este botón.</p>
      </header>

      <div className="rounded-3xl border border-ghost-mintStrong bg-ghost-mint/70 p-5 text-sm leading-6 text-ghost-ink">
        <p className="font-black">Esto es una simulación.</p>
        <p className="mt-1">No se cobrará nada. No pedimos tarjeta.</p>
      </div>

      <article className="rounded-[2rem] border border-ghost-line bg-white p-5 shadow-card sm:p-7">
        <div className="flex items-start justify-between gap-4 border-b border-ghost-line pb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ghost-muted">Tienda ficticia</p>
            <h2 className="mt-1 text-xl font-black text-ghost-ink">{snapshot.storeName}</h2>
          </div>
          <span className="rounded-full bg-ghost-sand px-3 py-1 text-xs font-bold text-ghost-ink">{snapshot.items.length} {snapshot.items.length === 1 ? 'línea' : 'líneas'}</span>
        </div>

        <div className="divide-y divide-ghost-line">
          {snapshot.items.map((item) => (
            <div key={item.productId} className="flex items-center justify-between gap-4 py-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-ghost-ink">{item.name}</p>
                <p className="mt-1 text-xs font-semibold text-ghost-muted">{item.quantity} × {formatPen(item.unitPriceInCents)}</p>
              </div>
              <p className="shrink-0 text-sm font-black text-ghost-ink">{formatPen(item.unitPriceInCents * item.quantity)}</p>
            </div>
          ))}
        </div>

        <div className="mt-2 border-t border-ghost-line pt-5">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-bold text-ghost-muted">Subtotal</span>
            <span className="text-2xl font-black text-ghost-ink">{formatPen(snapshot.subtotalInCents)}</span>
          </div>
        </div>
      </article>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-3xl border border-ghost-line bg-white p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-ghost-muted">Método de pago</p>
          <p className="mt-2 text-base font-black text-ghost-ink">No pagar</p>
        </div>
        <div className="rounded-3xl border border-ghost-line bg-white p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-ghost-muted">Destino</p>
          <p className="mt-2 text-base font-black text-ghost-ink">Al olvido</p>
        </div>
      </div>

      <Button className="w-full" onClick={onConfirm}>
        Confirmar compra fantasma
      </Button>
      <p className="text-center text-xs font-semibold leading-5 text-ghost-muted">No se crea ningún pedido ni se guarda información personal fuera de este dispositivo.</p>
    </section>
  )
}
