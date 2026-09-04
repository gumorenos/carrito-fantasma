import { Button } from '../components/Button'
import { SimulationBadge } from '../components/SimulationBadge'
import type { RitualSnapshot } from '../types/ritual'

const trackingSteps = [
  { title: 'Tu impulso fue recibido.', detail: 'El carrito fantasma ya está en marcha.' },
  { title: 'Estamos empacando tu antojo.', detail: 'Solo estamos empacando una pausa para decidir.' },
  { title: 'Tu carrito salió rumbo al olvido.', detail: 'No hay mapa ni repartidor: solo un momento para ti.' },
  { title: 'Entrega completada: conservaste tu plata.', detail: 'El pedido imaginario llegó a donde tenía que llegar.' },
]

type TrackingScreenProps = {
  snapshot: RitualSnapshot
  step: number
  onBack: () => void
  onAdvance: () => void
  onSkip: () => void
}

export function TrackingScreen({ snapshot, step, onBack, onAdvance, onSkip }: TrackingScreenProps) {
  const currentStep = trackingSteps[Math.min(Math.max(step, 0), trackingSteps.length - 1)]
  const isLastStep = step >= trackingSteps.length - 1

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center py-6 sm:py-10">
      <div className="flex items-center justify-between gap-3">
        <button className="text-sm font-bold text-ghost-teal hover:text-ghost-tealDark" onClick={onBack} type="button">
          ← Volver al checkout
        </button>
        <SimulationBadge />
      </div>
      <div className="mt-10 rounded-[2rem] border border-ghost-line bg-white p-6 text-center shadow-soft sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-ghost-coral">Seguimiento simbólico · {snapshot.storeName}</p>
        <div aria-hidden="true" className="mx-auto mt-8 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-ghost-mint text-5xl text-ghost-teal">✧</div>
        <p aria-live="polite" className="mt-8 text-2xl font-black leading-tight tracking-tight text-ghost-ink">{currentStep.title}</p>
        <p className="mx-auto mt-3 max-w-sm leading-7 text-ghost-muted">{currentStep.detail}</p>

        <div className="mt-8 flex items-center justify-center gap-2" aria-label={`Paso ${Math.min(step + 1, trackingSteps.length)} de ${trackingSteps.length}`}>
          {trackingSteps.map((trackingStep, index) => (
            <span
              key={trackingStep.title}
              aria-hidden="true"
              className={`h-2 rounded-full transition-all ${index <= step ? 'w-8 bg-ghost-teal' : 'w-2 bg-ghost-line'}`}
            />
          ))}
        </div>

        <Button className="mt-8 w-full" onClick={onAdvance}>
          {isLastStep ? 'Ver cuánto no gastaste' : 'Continuar'}
        </Button>
        {!isLastStep && (
          <button className="mt-3 min-h-10 px-3 text-sm font-bold text-ghost-teal hover:underline" onClick={onSkip} type="button">
            Saltar al resultado
          </button>
        )}
      </div>
    </section>
  )
}
