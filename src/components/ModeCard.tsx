import type { AppMode } from '../types/product'

type ModeCardProps = {
  mode: AppMode
  title: string
  description: string
  icon: string
  onClick?: () => void
}

export function ModeCard({ mode, title, description, icon, onClick }: ModeCardProps) {
  const content = (
    <>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm" aria-hidden="true">
        {icon}
      </span>
      <span className="min-w-0 text-left">
        <span className="block text-sm font-extrabold text-ghost-ink">{title}</span>
        <span className="mt-1 block text-xs leading-5 text-ghost-muted">{description}</span>
      </span>
      <span aria-hidden="true" className="ml-auto text-lg text-ghost-teal">↗</span>
    </>
  )

  if (onClick) {
    return (
      <button
        aria-label={`Elegir modo ${mode === 'shopping' ? 'comprar algo' : 'pedir comida'}`}
        className="group flex min-h-24 w-full items-center gap-3 rounded-3xl border border-ghost-line bg-white/80 p-4 text-left shadow-card transition hover:-translate-y-0.5 hover:border-ghost-mintStrong hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ghost-teal"
        onClick={onClick}
        type="button"
      >
        {content}
      </button>
    )
  }

  return (
    <div className="flex min-h-24 items-center gap-3 rounded-3xl border border-ghost-line bg-white/80 p-4 shadow-card">
      {content}
    </div>
  )
}
