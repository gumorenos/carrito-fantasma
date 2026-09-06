import { Button } from '../components/Button'
import { ProductVisual } from '../components/ProductVisual'
import { formatPen } from '../lib/money'
import type { RitualSnapshot } from '../types/ritual'
type Props = {
  snapshot: RitualSnapshot
  onBack: () => void
  onConfirm: () => void
}
export function CheckoutScreen({ snapshot, onBack, onConfirm }: Props) {
  return (
    <section className="mx-auto max-w-4xl space-y-5">
      <button type="button" onClick={onBack} className="min-h-11 text-sm">
        ← Volver al carrito
      </button>
      <header>
        <p className="text-sm text-ghost-muted">{snapshot.storeName}</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Revisa tu pedido
        </h1>
      </header>
      <div className="grid gap-5 md:grid-cols-[1fr_300px]">
        <div className="divide-y divide-ghost-line overflow-hidden rounded-xl border border-ghost-line bg-white">
          {snapshot.items.map((item) => (
            <article key={item.productId} className="flex gap-3 p-4">
              <ProductVisual
                category={item.category}
                imageUrl={item.imageUrl}
                name={item.name}
                className="h-20 w-20 shrink-0 rounded-lg"
              />
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-semibold">{item.name}</h2>
                <p className="mt-2 text-sm text-ghost-muted">
                  {item.quantity} × {formatPen(item.unitPriceInCents)}
                </p>
                <p className="mt-1 font-semibold">
                  {formatPen(item.quantity * item.unitPriceInCents)}
                </p>
              </div>
            </article>
          ))}
        </div>
        <aside className="h-fit rounded-xl border border-ghost-line bg-white p-5">
          <h2 className="text-lg font-semibold">Resumen</h2>
          <div className="mt-4 flex justify-between text-sm">
            <span>Productos</span>
            <span>
              {snapshot.items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <div className="mt-4 flex justify-between border-t border-ghost-line pt-4 text-xl font-bold">
            <span>Total</span>
            <span>{formatPen(snapshot.subtotalInCents)}</span>
          </div>
          <Button className="mt-6 w-full" onClick={onConfirm}>
            Confirmar pedido
          </Button>
          <p className="mt-3 text-sm leading-5 text-ghost-muted">
            No se realizará ningún cobro ni envío.
          </p>
        </aside>
      </div>
    </section>
  )
}
