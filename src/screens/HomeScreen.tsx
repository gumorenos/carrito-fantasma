import { Button } from '../components/Button'
import { ModeCard } from '../components/ModeCard'
import type { AppMode } from '../types/product'

type HomeScreenProps = {
  onStart: () => void
  onHistory: () => void
  onSelectMode: (mode: AppMode) => void
}

export function HomeScreen({ onStart, onHistory, onSelectMode }: HomeScreenProps) {
  return (
    <div className="space-y-6 pb-3">
      <section className="overflow-hidden rounded-2xl border border-ghost-line bg-white shadow-market">
        <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
          <div className="bg-ghost-sunSoft p-5 sm:p-8 lg:p-10">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-ghost-coral">Compra de mentira · ahorro de verdad</p>
            <h1 className="mt-2 max-w-2xl text-[2rem] font-black leading-[1.04] tracking-[-0.045em] text-ghost-ink sm:text-5xl">
              Llena el carrito. Quédate con tu plata.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-ghost-muted sm:text-base sm:leading-7">
              Recorre tiendas ficticias, haz un checkout falso y deja que el impulso termine sin cobrarte nada.
            </p>
            <div className="mt-5 flex flex-col gap-2.5 min-[420px]:flex-row">
              <Button className="w-full min-[420px]:w-auto" onClick={onStart}>
                Soltar un impulso <span aria-hidden="true">→</span>
              </Button>
              <Button className="w-full min-[420px]:w-auto" onClick={onHistory} variant="secondary">
                Ver historial
              </Button>
            </div>
          </div>
          <aside className="border-t border-ghost-line bg-white p-5 lg:border-l lg:border-t-0 lg:p-7">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-ghost-plum">El ritual en 3 pasos</p>
            <ol className="mt-4 grid gap-3 min-[500px]:grid-cols-3 lg:grid-cols-1">
              {[
                ['1', 'Elige algo', 'Navega productos ficticios.'],
                ['2', 'No pagues', 'Confirma el checkout fantasma.'],
                ['3', 'Mira el ahorro', 'Cierra el impulso con tu total.'],
              ].map(([number, title, detail]) => (
                <li key={number} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-ghost-sun text-xs font-black text-ghost-plum">{number}</span>
                  <span>
                    <span className="block text-sm font-black text-ghost-ink">{title}</span>
                    <span className="mt-0.5 block text-xs leading-4 text-ghost-muted">{detail}</span>
                  </span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section aria-labelledby="modes-title">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.12em] text-ghost-plum">¿Qué quieres dejar pasar?</p>
            <h2 id="modes-title" className="mt-1 text-2xl font-black tracking-tight text-ghost-ink">Empieza a explorar</h2>
          </div>
          <span className="hidden text-xs font-bold text-ghost-muted sm:block">Sin cuenta · sin tarjeta</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <ModeCard
            description="Gadgets, decoración, gaming y caprichos de marketplace."
            icon="🛒"
            mode={'shopping' satisfies AppMode}
            onClick={() => onSelectMode('shopping')}
            title="Comprar algo"
          />
          <ModeCard
            description="Hamburguesas, sushi, postres y antojos de delivery."
            icon="🍔"
            mode={'food' satisfies AppMode}
            onClick={() => onSelectMode('food')}
            title="Pedir comida"
          />
        </div>
      </section>

      <aside className="flex items-start gap-3 rounded-xl border border-ghost-plum/15 bg-white px-4 py-3 shadow-sm">
        <span aria-hidden="true" className="mt-0.5 text-lg">👻</span>
        <div>
          <p className="text-sm font-black text-ghost-ink">Nada de esto está a la venta.</p>
          <p className="mt-0.5 text-xs leading-5 text-ghost-muted">No pedimos tarjeta, dirección ni datos personales. Todo es una simulación local.</p>
        </div>
      </aside>
    </div>
  )
}
