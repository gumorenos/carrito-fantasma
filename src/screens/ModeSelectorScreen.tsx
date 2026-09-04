import { ModeCard } from '../components/ModeCard'
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
    <section className="mx-auto max-w-3xl space-y-5 py-1 sm:py-4">
      <button className="inline-flex min-h-11 items-center text-sm font-black text-ghost-plum hover:text-ghost-plumDark" onClick={onBack} type="button">
        ← Volver al inicio
      </button>

      <header>
        <p className="text-xs font-black uppercase tracking-[0.14em] text-ghost-coral">Primero, elige el escenario</p>
        <h1 className="mt-1.5 text-3xl font-black tracking-[-0.04em] text-ghost-ink sm:text-4xl">¿Qué te provoca comprar?</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ghost-muted">Arma un carrito ficticio. No se cobra, no se envía y no pide datos reales.</p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        <ModeCard description="Gadgets, decoración, gaming y caprichos de marketplace." icon="🛒" mode="shopping" onClick={() => onPick('shopping')} title="Comprar algo" />
        <ModeCard description="Hamburguesas, sushi, postres y antojos de delivery." icon="🍔" mode="food" onClick={() => onPick('food')} title="Pedir comida" />
      </div>

      <fieldset className="rounded-xl border border-ghost-line bg-white p-4 shadow-sm">
        <div className="sm:flex sm:items-center sm:justify-between sm:gap-5">
          <div>
            <legend className="text-sm font-black text-ghost-ink">¿Qué tan fuerte está el impulso ahora?</legend>
            <p className="mt-0.5 text-xs leading-5 text-ghost-muted">Opcional. Puedes elegir un modo sin responder.</p>
          </div>
          <div className="mt-3 min-w-[260px] sm:mt-0">
            <div className="grid grid-cols-5 gap-1.5" role="radiogroup" aria-label="Intensidad inicial del impulso">
              {urgeOptions.map((rating) => (
                <button
                  key={rating}
                  aria-checked={initialUrgeRating === rating}
                  aria-label={`${rating} de 5`}
                  className={`min-h-11 rounded-lg border text-sm font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ghost-plum ${initialUrgeRating === rating ? 'border-ghost-plum bg-ghost-plum text-white' : 'border-ghost-line bg-ghost-mist text-ghost-ink hover:border-ghost-plum/30'}`}
                  onClick={() => onUrgeRatingChange(rating)}
                  role="radio"
                  type="button"
                >
                  {rating}
                </button>
              ))}
            </div>
            <div className="mt-1 flex justify-between text-[10px] font-semibold text-ghost-muted" aria-hidden="true"><span>Leve</span><span>Muy fuerte</span></div>
          </div>
        </div>
        {initialUrgeRating !== null && (
          <button className="mt-2 inline-flex min-h-11 items-center text-xs font-bold text-ghost-plum hover:underline" onClick={() => onUrgeRatingChange(null)} type="button">Omitir esta pregunta</button>
        )}
      </fieldset>
    </section>
  )
}
