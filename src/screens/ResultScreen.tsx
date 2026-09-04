import { Button } from '../components/Button'
import { FeedbackLink } from '../components/FeedbackLink'
import { SimulationBadge } from '../components/SimulationBadge'
import { formatPen } from '../lib/money'
import type { StillWantsToBuy } from '../types/history'
import type { UrgeRating } from '../types/product'
import type { RitualSnapshot } from '../types/ritual'

type ResultScreenProps = {
  snapshot: RitualSnapshot
  urgeRating: UrgeRating | null
  stillWantsToBuy: StillWantsToBuy | null
  saved: boolean
  notice?: string | null
  onUrgeRatingChange: (rating: UrgeRating) => void
  onStillWantsChange: (value: StillWantsToBuy) => void
  onSave: () => void
  onNew: () => void
  onShare: () => void
  onHistory: () => void
}

const urgeOptions: Array<{ value: UrgeRating; label: string }> = [
  { value: 1, label: 'Muy leve' },
  { value: 2, label: 'Leve' },
  { value: 3, label: 'Medio' },
  { value: 4, label: 'Fuerte' },
  { value: 5, label: 'Muy fuerte' },
]

const wantsOptions: Array<{ value: StillWantsToBuy; label: string }> = [
  { value: 'yes', label: 'Sí' },
  { value: 'no', label: 'No' },
  { value: 'maybe', label: 'Tal vez' },
]

export function ResultScreen({
  snapshot,
  urgeRating,
  stillWantsToBuy,
  saved,
  notice,
  onUrgeRatingChange,
  onStillWantsChange,
  onSave,
  onNew,
  onShare,
  onHistory,
}: ResultScreenProps) {
  return (
    <section className="mx-auto max-w-xl space-y-6 py-4 sm:py-10">
      <div className="flex justify-end">
        <SimulationBadge />
      </div>
      <div className="rounded-[2rem] border border-ghost-mintStrong bg-white p-6 text-center shadow-soft sm:p-10">
        <div aria-hidden="true" className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-ghost-mint text-4xl text-ghost-teal">✧</div>
        <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-ghost-coral">Ritual completado</p>
        <h1 className="mt-3 text-4xl font-black leading-tight tracking-[-0.05em] text-ghost-ink sm:text-5xl">No gastaste {formatPen(snapshot.subtotalInCents)}</h1>
        <p className="mt-4 text-lg font-bold text-ghost-teal">El carrito se fue. Tu plata no.</p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-ghost-muted">Es una estimación del carrito ficticio, no un saldo bancario. Te diste tiempo antes de decidir.</p>
      </div>

      <div className="rounded-[2rem] border border-ghost-line bg-white p-4 shadow-card sm:p-7">
        <div>
          <h2 className="text-xl font-black tracking-tight text-ghost-ink">Una pregunta rápida</h2>
          <p className="mt-1 text-sm leading-6 text-ghost-muted">Tu respuesta es opcional. No pedimos texto libre ni datos personales.</p>
        </div>

        <fieldset className="mt-6">
          <legend className="text-sm font-black text-ghost-ink">¿Qué tan fuerte está el impulso ahora?</legend>
          {snapshot.initialUrgeRating && (
            <p className="mt-1 text-xs leading-5 text-ghost-muted">Al comenzar marcaste {snapshot.initialUrgeRating}/5.</p>
          )}
          <div className="mt-3 grid grid-cols-5 gap-1" role="radiogroup" aria-label="Intensidad final del impulso">
            {urgeOptions.map((option) => (
              <button
                key={option.value}
                aria-checked={urgeRating === option.value}
                className={`flex min-h-16 flex-col items-center justify-center rounded-2xl border px-1 text-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ghost-teal ${urgeRating === option.value ? 'border-ghost-teal bg-ghost-teal text-white' : 'border-ghost-line bg-ghost-mist text-ghost-ink hover:border-ghost-mintStrong'}`}
                onClick={() => onUrgeRatingChange(option.value)}
                role="radio"
                type="button"
              >
                <span className="text-lg font-black">{option.value}</span>
                <span className="mt-0.5 text-[10px] font-bold leading-3">{option.label}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-7">
          <legend className="text-sm font-black text-ghost-ink">¿Igual quieres comprarlo o pedirlo?</legend>
          <div className="mt-3 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Si todavía quieres comprarlo">
            {wantsOptions.map((option) => (
              <button
                key={option.value}
                aria-checked={stillWantsToBuy === option.value}
                className={`min-h-12 rounded-2xl border px-2 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ghost-teal ${stillWantsToBuy === option.value ? 'border-ghost-coral bg-ghost-coral text-white' : 'border-ghost-line bg-ghost-mist text-ghost-ink hover:border-ghost-mintStrong'}`}
                onClick={() => onStillWantsChange(option.value)}
                role="radio"
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>

        <Button className="mt-8 w-full" disabled={saved} onClick={onSave}>
          {saved ? 'Carrito fantasma guardado' : 'Guardar carrito fantasma'}
        </Button>
        {notice && (
          <p aria-live="polite" className="mt-3 rounded-2xl bg-ghost-mint/70 p-3 text-center text-sm font-semibold leading-5 text-ghost-teal">{notice}</p>
        )}
      </div>

      <div className={`grid gap-3 ${saved ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
        <Button onClick={onNew} variant="secondary">
          Simular otro impulso
        </Button>
        <Button onClick={onShare} variant="secondary">
          Compartir
        </Button>
        {saved && (
          <Button onClick={onHistory} variant="secondary">
            Ver historial
          </Button>
        )}
      </div>
      <FeedbackLink className="mx-auto" />
    </section>
  )
}
