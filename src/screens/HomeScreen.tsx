import { Button } from '../components/Button'
import { ModeCard } from '../components/ModeCard'
import { SimulationBadge } from '../components/SimulationBadge'
import type { AppMode } from '../types/product'

type HomeScreenProps = {
  onStart: () => void
  onHistory: () => void
  onSelectMode: (mode: AppMode) => void
}

export function HomeScreen({ onStart, onHistory, onSelectMode }: HomeScreenProps) {
  return (
    <div className="space-y-8 pb-4">
      <section className="relative overflow-hidden rounded-[2rem] border border-ghost-line bg-white px-5 py-8 shadow-soft sm:px-10 sm:py-12">
        <div aria-hidden="true" className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-ghost-mint opacity-80 blur-2xl" />
        <div aria-hidden="true" className="absolute -bottom-24 left-1/3 h-44 w-44 rounded-full bg-ghost-sand opacity-70 blur-2xl" />
        <div className="relative max-w-2xl">
          <SimulationBadge />
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-ghost-coral">Una pausa para decidir</p>
          <h1 className="mt-3 max-w-xl text-4xl font-black leading-[1.04] tracking-[-0.04em] text-ghost-ink sm:text-6xl">
            ¿Te dieron ganas de comprar?
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-ghost-muted sm:text-lg">
            Llena un carrito ficticio, haz el ritual completo y mira cuánto no gastaste. Nada se cobra y nada llega a tu puerta.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button className="w-full sm:w-auto" onClick={onStart}>
              Soltar un impulso
              <span aria-hidden="true" className="text-lg">→</span>
            </Button>
            <Button className="w-full sm:w-auto" onClick={onHistory} variant="secondary">
              Ver historial
            </Button>
          </div>
        </div>
      </section>

      <section aria-labelledby="modes-title" className="space-y-4">
        <div className="flex items-end justify-between gap-4 px-1">
          <div>
            <p className="text-sm font-bold text-ghost-teal">Elige tu ritual</p>
            <h2 id="modes-title" className="mt-1 text-2xl font-black tracking-tight text-ghost-ink">Dos formas de soltarlo</h2>
          </div>
          <span className="hidden text-xs font-semibold text-ghost-muted sm:block">Sin cuenta · sin tarjeta</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <ModeCard
            description="Gadgets, decoración y esas cosas que aparecen de pronto en tu wishlist."
            icon="✦"
            mode={'shopping' satisfies AppMode}
            onClick={() => onSelectMode('shopping')}
            title="Comprar algo"
          />
          <ModeCard
            description="Hamburguesas, sushi, postres y antojos que pueden esperar un poquito."
            icon="◉"
            mode={'food' satisfies AppMode}
            onClick={() => onSelectMode('food')}
            title="Pedir comida"
          />
        </div>
      </section>

      <aside className="rounded-3xl border border-ghost-mintStrong bg-ghost-mint/60 p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
        <div>
          <p className="text-sm font-extrabold text-ghost-ink">Hecho para darte tiempo</p>
          <p className="mt-1 text-sm leading-6 text-ghost-muted">No vendemos nada. No pedimos tarjeta. Es una simulación.</p>
        </div>
        <span aria-hidden="true" className="mt-4 block text-3xl text-ghost-teal sm:mt-0">✧</span>
      </aside>
    </div>
  )
}
