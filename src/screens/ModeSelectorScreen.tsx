import { ModeCard } from '../components/ModeCard'
import { SimulationBadge } from '../components/SimulationBadge'
import type { AppMode, UrgeRating } from '../types/product'

type ModeSelectorScreenProps = {
  initialUrgeRating: UrgeRating | null
  onBack: () => void
  onPick: (mode: AppMode) => void
  onUrgeRatingChange: (rating: UrgeRating | null) => void
}

const urgeOptions: UrgeRating[] = [1, 2, 3, 4, 5]

export function ModeSelectorScreen({ initialUrgeRating, onBack, onPick, onUrgeRatingChange }: ModeSelectorScreenProps) {
  return (
    <section className="mx-auto max-w-xl space-y-6 py-4 sm:py-10">
      <button className="inline-flex min-h-11 items-center text-sm font-bold text-ghost-teal hover:text-ghost-tealDark" onClick={onBack} type="button">
        ← Volver al inicio
      </button>
      <div>
        <SimulationBadge />
        <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-ghost-coral">Paso 1 · elegir el impulso</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-ghost-ink">¿Qué te provoca comprar?</h1>
        <p className="mt-4 leading-7 text-ghost-muted">Elige un escenario y arma un carrito de mentira. No se cobra, no se envía y no pide datos reales.</p>
      </div>
      <fieldset className="rounded-3xl border border-ghost-line bg-white p-4 shadow-card sm:p-5">
        <legend className="px-1 text-sm font-black text-ghost-ink">¿Qué tan fuerte está el impulso ahora?</legend>
        <p className="mt-1 text-xs leading-5 text-ghost-muted">Opcional. Nos ayuda a comparar cómo cambia al terminar el ritual.</p>
        <div className="mt-4 grid grid-cols-5 gap-1" role="radiogroup" aria-label="Intensidad inicial del impulso">
          {urgeOptions.map((rating) => (
            <button
              key={rating}
              aria-checked={initialUrgeRating === rating}
              aria-label={`${rating} de 5`}
              className={`min-h-12 rounded-2xl border text-sm font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ghost-teal ${initialUrgeRating === rating ? 'border-ghost-teal bg-ghost-teal text-white' : 'border-ghost-line bg-ghost-mist text-ghost-ink hover:border-ghost-mintStrong'}`}
              onClick={() => onUrgeRatingChange(rating)}
              role="radio"
              type="button"
            >
              {rating}
            </button>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[11px] font-semibold text-ghost-muted" aria-hidden="true">
          <span>Leve</span>
          <span>Muy fuerte</span>
        </div>
        <div className="mt-3 text-center">
          {initialUrgeRating === null ? (
            <p className="text-xs leading-5 text-ghost-muted">Puedes elegir un modo sin responder esta pregunta.</p>
          ) : (
            <button className="inline-flex min-h-11 items-center px-3 text-xs font-bold text-ghost-teal hover:underline" onClick={() => onUrgeRatingChange(null)} type="button">
              Omitir esta pregunta
            </button>
          )}
        </div>
      </fieldset>
      <div className="space-y-3">
        <ModeCard
          description="Gadgets, decoración, gaming y esas cosas que aparecen de pronto en tu wishlist."
          icon="✦"
          mode="shopping"
          onClick={() => onPick('shopping')}
          title="Comprar algo"
        />
        <ModeCard
          description="Hamburguesas, sushi, postres y antojos que pueden esperar un poquito."
          icon="◉"
          mode="food"
          onClick={() => onPick('food')}
          title="Pedir comida"
        />
      </div>
    </section>
  )
}
