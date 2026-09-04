import { Button } from '../components/Button'
import { ProductVisual } from '../components/ProductVisual'
import { formatPen } from '../lib/money'
import type { RitualSnapshot } from '../types/ritual'

type CheckoutScreenProps = {
  snapshot: RitualSnapshot
  onBack: () => void
  onConfirm: () => void
}

export function CheckoutScreen({ snapshot, onBack, onConfirm }: CheckoutScreenProps) {
  return (
    <section className="mx-auto max-w-5xl space-y-4 py-1 sm:py-4">
      <button className="inline-flex min-h-11 items-center text-sm font-black text-ghost-plum hover:text-ghost-plumDark" onClick={onBack} type="button">← Volver al carrito</button>
      <header className="border-b border-ghost-line pb-3">
        <p className="text-xs font-black uppercase tracking-[0.13em] text-ghost-coral">Último paso comercial</p>
        <h1 className="mt-1 text-3xl font-black tracking-[-0.04em] text-ghost-ink sm:text-4xl">Confirma tu compra fantasma</h1>
        <p className="mt-2 text-sm leading-6 text-ghost-muted">Esto culmina el ritual. No existe una compra real detrás del botón.</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1fr_360px] lg:items-start">
        <article className="overflow-hidden rounded-2xl border border-ghost-line bg-white shadow-market">
          <div className="flex items-center justify-between gap-3 border-b border-ghost-line bg-ghost-sunSoft px-4 py-3">
            <div><p className="text-[10px] font-black uppercase tracking-[0.12em] text-ghost-muted">Tienda ficticia</p><h2 className="mt-0.5 text-lg font-black text-ghost-ink">{snapshot.storeName}</h2></div>
            <span className="text-xs font-black text-ghost-plum">{snapshot.items.length} {snapshot.items.length === 1 ? 'producto' : 'productos'}</span>
          </div>
          <div className="divide-y divide-ghost-line">
            {snapshot.items.map((item) => (
              <div key={item.productId} className="flex items-center gap-3 p-3.5">
                <ProductVisual category={item.category} className="h-14 w-14 shrink-0 rounded-lg" name={item.name} showLabel={false} />
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-black text-ghost-ink">{item.name}</p><p className="mt-0.5 text-xs font-semibold text-ghost-muted">{item.quantity} × {formatPen(item.unitPriceInCents)}</p></div>
                <p className="shrink-0 text-sm font-black text-ghost-ink">{formatPen(item.unitPriceInCents * item.quantity)}</p>
              </div>
            ))}
          </div>
        </article>

        <aside className="space-y-3 lg:sticky lg:top-24">
          <div className="rounded-2xl border border-ghost-plum/15 bg-white p-4 shadow-market">
            <p className="text-sm font-black text-ghost-ink">Esto es una simulación.</p>
            <p className="mt-1 text-xs leading-5 text-ghost-muted">No se cobrará nada. No pedimos tarjeta, dirección ni datos personales.</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-ghost-mist p-3"><p className="text-[10px] font-black uppercase tracking-[0.08em] text-ghost-muted">Método</p><p className="mt-1 text-sm font-black text-ghost-ink">No pagar</p></div>
              <div className="rounded-lg bg-ghost-mist p-3"><p className="text-[10px] font-black uppercase tracking-[0.08em] text-ghost-muted">Destino</p><p className="mt-1 text-sm font-black text-ghost-ink">Al olvido</p></div>
            </div>
            <div className="mt-4 flex items-end justify-between gap-3 border-t border-ghost-line pt-4"><span className="text-sm font-semibold text-ghost-muted">Subtotal</span><span className="text-2xl font-black text-ghost-ink">{formatPen(snapshot.subtotalInCents)}</span></div>
            <Button className="mt-4 w-full" onClick={onConfirm}>Confirmar compra fantasma</Button>
          </div>
          <p className="px-2 text-center text-[11px] font-semibold leading-4 text-ghost-muted">No se crea ningún pedido ni se guarda información personal fuera de este dispositivo.</p>
        </aside>
      </div>
    </section>
  )
}
