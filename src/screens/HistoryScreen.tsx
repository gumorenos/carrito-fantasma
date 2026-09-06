import { formatPen } from '../lib/money'
import type { GhostCartHistoryEntry } from '../types/history'
type Props = {
  entries: GhostCartHistoryEntry[]
  onBack: () => void
  onOpen: (entry: GhostCartHistoryEntry) => void
  onClear: () => void
  storageAvailable: boolean
}
export function HistoryScreen({
  entries,
  onBack,
  onOpen,
  onClear,
  storageAvailable,
}: Props) {
  return (
    <section className="mx-auto max-w-3xl space-y-5">
      <button type="button" className="min-h-11 text-sm" onClick={onBack}>
        ← Volver a la tienda
      </button>
      <header className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">Mis pedidos</h1>
        {entries.length > 0 && (
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  '¿Borrar el historial de pedidos de este dispositivo?',
                )
              )
                onClear()
            }}
            className="min-h-11 text-sm text-ghost-muted underline"
          >
            Borrar historial
          </button>
        )}
      </header>
      {!storageAvailable && (
        <p role="alert" className="rounded-lg bg-amber-50 p-3 text-sm">
          El almacenamiento del dispositivo no está disponible. Los cambios
          actuales solo se conservan en esta pestaña.
        </p>
      )}
      {entries.length === 0 ? (
        <div className="rounded-xl border border-ghost-line bg-white p-8">
          <h2 className="text-xl font-semibold">
            Aquí encontrarás tus pedidos
          </h2>
          <p className="mt-2 text-ghost-muted">
            Cuando confirmes una selección, aparecerá automáticamente aquí.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="mt-4 min-h-11 font-semibold text-ghost-plum underline"
          >
            Explorar productos
          </button>
        </div>
      ) : (
        entries.map((entry) => (
          <article
            key={entry.id}
            className="rounded-xl border border-ghost-line bg-white p-5"
          >
            <div className="flex flex-wrap justify-between gap-3 border-b border-ghost-line pb-3">
              <div>
                <p className="text-sm text-ghost-muted">
                  Pedido #{entry.id.slice(0, 8).toUpperCase()}
                </p>
                <h2 className="mt-1 font-semibold">{entry.storeName}</h2>
              </div>
              <p className="text-sm text-ghost-muted">
                {Number.isFinite(Date.parse(entry.createdAt))
                  ? new Intl.DateTimeFormat('es-PE', {
                      dateStyle: 'medium',
                    }).format(new Date(entry.createdAt))
                  : 'Fecha no disponible'}
              </p>
            </div>
            <div className="my-4 flex gap-2 overflow-hidden">
              {entry.items.slice(0, 5).map((item) => (
                <img
                  key={item.productId}
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-16 w-16 rounded-lg bg-slate-50 object-contain"
                />
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">
                {formatPen(entry.subtotalAvoidedInCents)}
              </span>
              <button
                type="button"
                onClick={() => onOpen(entry)}
                className="min-h-11 rounded-lg border border-ghost-line px-4 text-sm font-semibold"
              >
                Ver pedido
              </button>
            </div>
          </article>
        ))
      )}
      <p className="text-sm leading-6 text-ghost-muted">
        Pedidos de Carrito Fantasma guardados en este dispositivo. Los importes
        representan tus selecciones, no ahorro bancario confirmado.
      </p>
    </section>
  )
}
