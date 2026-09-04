import { Button } from '../components/Button'
import { FeedbackLink } from '../components/FeedbackLink'
import { ProductCard } from '../components/ProductCard'
import { productCategoryLabels } from '../data'
import { getAverageSavedAmount, getFrequentCategories, getMostUsedMode, getTotalSaved } from '../lib/history'
import { formatPen } from '../lib/money'
import type { GhostCartHistoryEntry } from '../types/history'
import type { Product } from '../types/product'

type HistoryScreenProps = {
  entries: GhostCartHistoryEntry[]
  recommendations: Product[]
  storageAvailable: boolean
  onBack: () => void
  onStart: () => void
  onClear: () => void
  onOpenRecommendation: (product: Product) => void
}

function formatHistoryDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Fecha no disponible'
  return new Intl.DateTimeFormat('es-PE', { dateStyle: 'medium' }).format(date)
}

export function HistoryScreen({
  entries,
  recommendations,
  storageAvailable,
  onBack,
  onStart,
  onClear,
  onOpenRecommendation,
}: HistoryScreenProps) {
  const totalAvoided = getTotalSaved(entries)
  const averageAvoided = getAverageSavedAmount(entries)
  const frequentCategories = getFrequentCategories(entries)
  const mostUsedMode = getMostUsedMode(entries)
  const mostUsedModeLabel = mostUsedMode === 'food' ? 'Pedir comida' : mostUsedMode === 'shopping' ? 'Comprar algo' : 'Todavía sin patrón'
  const topCategoryLabel = frequentCategories[0] ? productCategoryLabels[frequentCategories[0]].toLowerCase() : null

  const clearHistory = () => {
    if (window.confirm('¿Borrar todos tus carritos fantasma de este dispositivo?')) onClear()
  }

  return (
    <section className="mx-auto max-w-3xl space-y-5 py-2 sm:py-8">
      <button className="inline-flex min-h-11 items-center text-sm font-bold text-ghost-teal hover:text-ghost-tealDark" onClick={onBack} type="button">
        ← Volver al inicio
      </button>
      {entries.length === 0 ? (
        <div className="rounded-3xl border border-ghost-line bg-white p-6 text-center shadow-card sm:p-10">
          <div aria-hidden="true" className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ghost-mint text-3xl text-ghost-teal">✧</div>
          <h1 className="mt-6 text-3xl font-black tracking-tight text-ghost-ink">Tus carritos fantasma</h1>
          <p className="mx-auto mt-3 max-w-sm leading-7 text-ghost-muted">
            Aquí aparecerán tus sesiones completadas. Por ahora no hay cifras inventadas: tu historial empieza cuando tú decidas.
          </p>
          <Button className="mt-7 w-full" onClick={onStart}>
            Soltar un impulso
          </Button>
        </div>
      ) : (
        <>
          <div className="rounded-3xl border border-ghost-mintStrong bg-ghost-mint/70 p-6 shadow-card">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-ghost-teal">Monto decidido no gastar aquí</p>
            <p className="mt-2 text-4xl font-black tracking-[-0.04em] text-ghost-ink">{formatPen(totalAvoided)}</p>
            <p className="mt-2 text-sm leading-6 text-ghost-muted">Acumulado de {entries.length} {entries.length === 1 ? 'carrito fantasma' : 'carritos fantasma'} en este dispositivo.</p>
            <div className="mt-5 space-y-2 border-t border-ghost-mintStrong/70 pt-4 text-sm font-semibold leading-6 text-ghost-teal">
              {topCategoryLabel && <p>Últimamente tu radar apunta a {topCategoryLabel}.</p>}
              {mostUsedMode === 'food' && <p>Tus antojos suelen aparecer por delivery.</p>}
              <p>Tu carrito promedio evitado ronda los {formatPen(averageAvoided)}.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-ghost-line bg-white p-4 shadow-card">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-ghost-muted">Completados</p>
              <p className="mt-2 text-2xl font-black text-ghost-ink">{entries.length}</p>
              <p className="mt-1 text-xs font-semibold text-ghost-muted">rituales cerrados</p>
            </div>
            <div className="rounded-2xl border border-ghost-line bg-white p-4 shadow-card">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-ghost-muted">Ticket promedio</p>
              <p className="mt-2 text-2xl font-black text-ghost-ink">{formatPen(averageAvoided)}</p>
              <p className="mt-1 text-xs font-semibold text-ghost-muted">por carrito evitado</p>
            </div>
            <div className="col-span-2 rounded-2xl border border-ghost-line bg-white p-4 shadow-card">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-ghost-muted">Modo más usado</p>
              <p className="mt-2 text-xl font-black text-ghost-ink">{mostUsedModeLabel}</p>
              {mostUsedMode && <p className="mt-1 text-xs font-semibold text-ghost-muted">Tu historial marca una preferencia, no una etiqueta.</p>}
            </div>
          </div>

          <section className="rounded-2xl border border-ghost-line bg-white p-5 shadow-card" aria-labelledby="frequent-categories-title">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="frequent-categories-title" className="text-xl font-black tracking-tight text-ghost-ink">Categorías frecuentes</h2>
                <p className="mt-1 text-sm leading-6 text-ghost-muted">Últimamente tus carritos pasan por aquí.</p>
              </div>
              <span aria-hidden="true" className="text-2xl text-ghost-coral">✦</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {frequentCategories.slice(0, 5).map((category) => (
                <span key={category} className="rounded-full bg-ghost-mint px-3 py-1.5 text-xs font-bold text-ghost-teal">{productCategoryLabels[category]}</span>
              ))}
            </div>
          </section>

          {!storageAvailable && (
            <p className="rounded-2xl border border-ghost-sand bg-ghost-sand/70 p-4 text-sm leading-6 text-ghost-ink">El historial está disponible mientras esta pestaña siga abierta, pero no pudo guardarse en el dispositivo.</p>
          )}

          <div className="space-y-3">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-black tracking-tight text-ghost-ink">Últimos carritos</h2>
              <button className="min-h-11 px-2 text-xs font-bold text-ghost-coral hover:underline" onClick={clearHistory} type="button">Borrar historial</button>
            </div>
            {entries.map((entry) => {
              const itemCount = entry.items.reduce((total, item) => total + item.quantity, 0)
              const modeLabel = entry.mode === 'food' ? 'Pedir comida' : 'Comprar algo'
              return (
                <article key={entry.id} className="rounded-2xl border border-ghost-line bg-white p-4 shadow-card">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-ghost-muted">{formatHistoryDate(entry.createdAt)}</p>
                      <h3 className="mt-1 text-base font-black text-ghost-ink">{entry.storeName}</h3>
                      <p className="mt-1 text-sm font-semibold text-ghost-teal">{modeLabel} · {itemCount} {itemCount === 1 ? 'producto' : 'productos'}</p>
                    </div>
                    <p className="shrink-0 text-lg font-black text-ghost-ink">{formatPen(entry.subtotalAvoidedInCents)}</p>
                  </div>
                  {(entry.initialUrgeRating || entry.urgeRating || entry.stillWantsToBuy) && (
                    <p className="mt-3 border-t border-ghost-line pt-3 text-xs font-semibold text-ghost-muted">
                      {entry.initialUrgeRating && entry.urgeRating
                        ? `Impulso: ${entry.initialUrgeRating}/5 → ${entry.urgeRating}/5`
                        : entry.urgeRating
                          ? `Impulso al terminar: ${entry.urgeRating}/5`
                          : entry.initialUrgeRating
                            ? `Impulso al comenzar: ${entry.initialUrgeRating}/5`
                            : 'Sin rating'}
                      {entry.stillWantsToBuy ? ` · Todavía quería: ${entry.stillWantsToBuy === 'yes' ? 'sí' : entry.stillWantsToBuy === 'no' ? 'no' : 'tal vez'}` : ''}
                    </p>
                  )}
                </article>
              )
            })}
          </div>
        </>
      )}

      {recommendations.length > 0 && (
        <section aria-labelledby="recommendations-title" className="space-y-3">
          <div>
            <h2 id="recommendations-title" className="text-2xl font-black tracking-tight text-ghost-ink">Ideas para otro carrito</h2>
            <p className="mt-1 text-sm leading-6 text-ghost-muted">Sugerencias ficticias según tus categorías y tu ticket habitual. No es IA ni una tienda real.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {recommendations.map((product) => (
              <ProductCard
                key={product.id}
                categoryLabel={productCategoryLabels[product.category]}
                onClick={() => onOpenRecommendation(product)}
                product={product}
              />
            ))}
          </div>
        </section>
      )}
      <FeedbackLink className="mx-auto" />
    </section>
  )
}
