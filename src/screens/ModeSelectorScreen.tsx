import { Button } from '../components/Button'
import { ModeCard } from '../components/ModeCard'
import { SimulationBadge } from '../components/SimulationBadge'
import type { AppMode } from '../types/product'

type ModeSelectorScreenProps = {
  onBack: () => void
  onPick: (mode: AppMode) => void
}

export function ModeSelectorScreen({ onBack, onPick }: ModeSelectorScreenProps) {
  return (
    <section className="mx-auto max-w-xl space-y-6 py-4 sm:py-10">
      <button className="text-sm font-bold text-ghost-teal hover:text-ghost-tealDark" onClick={onBack} type="button">
        ← Volver al inicio
      </button>
      <div>
        <SimulationBadge />
        <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-ghost-coral">Paso 1 · elegir el impulso</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-ghost-ink">¿Qué te provoca comprar?</h1>
        <p className="mt-4 leading-7 text-ghost-muted">Elige un escenario y arma un carrito de mentira. No se cobra, no se envía y no pide datos reales.</p>
      </div>
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
      <Button className="w-full" onClick={onBack} variant="secondary">
        Ahora no
      </Button>
    </section>
  )
}
