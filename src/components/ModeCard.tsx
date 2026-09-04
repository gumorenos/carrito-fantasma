import type { AppMode } from '../types/product'

type ModeCardProps = {
  mode: AppMode
  title: string
  description: string
  icon: string
  onClick?: () => void
}

export function ModeCard({ mode, title, description, icon, onClick }: ModeCardProps) {
  const shopping = mode === 'shopping'
  const content = (
    <>
      <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl shadow-sm ${shopping ? 'bg-ghost-sun text-ghost-plum' : 'bg-ghost-coralSoft text-ghost-coral'}`} aria-hidden="true">
        {icon}
      </span>
      <span className="min-w-0 text-left">
        <span className="block text-base font-black tracking-tight text-ghost-ink">{title}</span>
        <span className="mt-1 block text-xs leading-[1.15rem] text-ghost-muted">{description}</span>
      </span>
      <span aria-hidden="true" className="ml-auto text-xl font-black text-ghost-plum">›</span>
    </>
  )

  if (onClick) {
    return (
      <button
        aria-label={`Elegir modo ${mode === 'shopping' ? 'comprar algo' : 'pedir comida'}`}
        className="group flex min-h-[94px] w-full items-center gap-3 rounded-2xl border border-ghost-line bg-white p-3.5 text-left shadow-market transition hover:-translate-y-0.5 hover:border-ghost-plum/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ghost-plum"
        onClick={onClick}
        type="button"
      >
        {content}
      </button>
    )
  }

  return (
    <div className="flex min-h-[94px] items-center gap-3 rounded-2xl border border-ghost-line bg-white p-3.5 shadow-market">
      {content}
    </div>
  )
}
