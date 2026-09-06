import { useState } from 'react'
import { Button } from '../components/Button'
import { formatPen } from '../lib/money'
import type { GhostCartHistoryEntry, StillWantsToBuy } from '../types/history'
import type { UrgeRating } from '../types/product'
type Props = {
  order: GhostCartHistoryEntry
  storageAvailable: boolean
  onHistory: () => void
  onNew: () => void
  onRetry: () => void
  onFeedback: (rating?: UrgeRating, wants?: StillWantsToBuy) => void
}
export function ResultScreen({
  order,
  storageAvailable,
  onHistory,
  onNew,
  onFeedback,
  onRetry,
}: Props) {
  const [shareNotice, setShareNotice] = useState('')
  async function share() {
    const text = `Mi selección en ${order.storeName}: ${formatPen(order.subtotalAvoidedInCents)}. Carrito Fantasma, sin cobro ni envío.`
    try {
      if (navigator.share)
        await navigator.share({ title: 'Mi selección', text })
      else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text)
        setShareNotice('Selección copiada.')
      } else setShareNotice('Compartir no está disponible en este navegador.')
    } catch {
      setShareNotice('No se compartió la selección.')
    }
  }
  return (
    <section className="mx-auto max-w-xl space-y-5 py-6">
      <div className="rounded-2xl border border-ghost-line bg-white p-6 sm:p-9">
        <div
          aria-hidden="true"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-ghost-mint text-2xl text-ghost-teal"
        >
          ✓
        </div>
        <p className="mt-5 text-sm text-ghost-muted">
          {order.storeName} · Pedido #{order.id.slice(0, 8).toUpperCase()}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Pedido confirmado
        </h1>
        <p className="mt-3 text-ghost-muted">
          Tu selección está en Mis pedidos.
        </p>
        <div className="mt-6 divide-y divide-ghost-line border-y border-ghost-line">
          {order.items.map((item) => (
            <div className="flex items-center gap-3 py-3" key={item.productId}>
              <img
                src={item.imageUrl}
                alt=""
                className="h-14 w-14 rounded-lg object-contain"
              />
              <span className="flex-1 text-sm">
                {item.name}
                <span className="mt-1 block text-ghost-muted">
                  Cantidad: {item.quantity}
                </span>
              </span>
              <span className="text-sm font-semibold">
                {formatPen(item.quantity * item.unitPriceInCents)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>{formatPen(order.subtotalAvoidedInCents)}</span>
        </div>
        {!storageAvailable && (
          <p role="alert" className="mt-4 rounded-lg bg-amber-50 p-3 text-sm">
            No se pudo guardar en este dispositivo. El pedido sigue disponible
            en esta pestaña; no la cierres si quieres conservarlo.{' '}
            <button
              type="button"
              onClick={onRetry}
              className="mt-2 block min-h-11 underline"
            >
              Reintentar guardado
            </button>
          </p>
        )}
        <Button className="mt-6 w-full" onClick={onHistory}>
          Ver mis pedidos
        </Button>
        <button
          type="button"
          onClick={onNew}
          className="mt-2 min-h-11 w-full text-sm font-semibold"
        >
          Volver a la tienda
        </button>
        <button
          type="button"
          onClick={share}
          className="min-h-11 w-full text-sm text-ghost-muted underline"
        >
          Compartir selección
        </button>
        {shareNotice && (
          <p role="status" className="mt-2 text-sm">
            {shareNotice}
          </p>
        )}
      </div>
      <details className="rounded-xl border border-ghost-line bg-white p-5">
        <summary className="cursor-pointer text-base font-semibold">
          ¿Cómo te sientes ahora?{' '}
          <span className="text-sm font-normal text-ghost-muted">Opcional</span>
        </summary>
        <p className="mt-4 text-sm leading-6 text-ghost-muted">
          No hubo cobro ni envío. Puedes registrar si esta pausa cambió tus
          ganas de comprar.
        </p>
        <fieldset className="mt-5">
          <legend className="text-sm font-semibold">
            Intensidad del impulso
          </legend>
          {order.initialUrgeRating && (
            <p className="mt-2 text-sm">
              Al comenzar: {order.initialUrgeRating}/5
            </p>
          )}
          <div className="mt-3 grid grid-cols-5 gap-2">
            {([1, 2, 3, 4, 5] as UrgeRating[]).map((rating) => (
              <button
                key={rating}
                type="button"
                aria-label={`${rating} de 5`}
                aria-pressed={order.urgeRating === rating}
                onClick={() => onFeedback(rating, order.stillWantsToBuy)}
                className={`min-h-11 rounded-lg border ${order.urgeRating === rating ? 'bg-ghost-plum text-white' : 'border-ghost-line'}`}
              >
                {rating}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-ghost-muted">
            1 Muy leve · 5 Muy fuerte
          </p>
        </fieldset>
        <fieldset className="mt-5">
          <legend className="text-sm font-semibold">
            ¿Todavía quieres comprarlo?
          </legend>
          <div className="mt-3 flex gap-2">
            {(['yes', 'no', 'maybe'] as StillWantsToBuy[]).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={order.stillWantsToBuy === value}
                onClick={() => onFeedback(order.urgeRating, value)}
                className={`min-h-11 flex-1 rounded-lg border text-sm ${order.stillWantsToBuy === value ? 'bg-ghost-plum text-white' : 'border-ghost-line'}`}
              >
                {value === 'yes' ? 'Sí' : value === 'no' ? 'No' : 'Tal vez'}
              </button>
            ))}
          </div>
        </fieldset>
        <p className="mt-3 text-xs text-ghost-muted" role="status">
          {order.urgeRating || order.stillWantsToBuy
            ? storageAvailable
              ? 'Respuesta guardada.'
              : 'Respuesta disponible solo en esta pestaña.'
            : 'Puedes omitir estas preguntas.'}
        </p>
      </details>
    </section>
  )
}
