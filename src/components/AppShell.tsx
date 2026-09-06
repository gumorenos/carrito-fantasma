import type { ReactNode } from 'react'
type Props = {
  children: ReactNode
  storeName: string
  cartCount: number
  onHome: () => void
  onCart: () => void
  onHistory: () => void
  onAbout: () => void
  activeScreen: string
}
export function AppShell({
  children,
  storeName,
  cartCount,
  onHome,
  onCart,
  onHistory,
  onAbout,
  activeScreen,
}: Props) {
  return (
    <div className="min-h-dvh bg-ghost-mist text-ghost-ink">
      <header className="sticky top-0 z-40 border-b border-ghost-line bg-white pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={onHome}
            className="flex min-h-11 items-center gap-3 text-left"
          >
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-ghost-plum text-xl font-bold text-white"
            >
              F
            </span>
            <span>
              <span className="block text-lg font-bold tracking-tight sm:text-xl">
                {storeName}
              </span>
              <span className="block text-xs text-ghost-muted">
                Carrito Fantasma
              </span>
            </span>
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onHistory}
              className="hidden min-h-11 rounded-lg px-4 text-sm font-semibold sm:block"
            >
              Mis pedidos
            </button>
            <button
              type="button"
              onClick={onCart}
              className="min-h-11 rounded-lg bg-ghost-plum px-4 text-sm font-semibold text-white"
            >
              Carrito{' '}
              <span className="ml-1 rounded bg-white/20 px-1.5 py-0.5">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>
      <main
        id="main-content"
        className="mx-auto max-w-6xl px-3 pb-28 pt-5 outline-none sm:px-6 sm:pb-10"
        tabIndex={-1}
      >
        {children}
      </main>
      <footer className="mx-auto max-w-6xl px-6 pb-24 text-sm text-ghost-muted sm:pb-8">
        <button type="button" onClick={onAbout} className="min-h-11 underline">
          Acerca de Carrito Fantasma
        </button>
      </footer>
      <nav
        aria-label="Navegación principal"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-ghost-line bg-white pb-[env(safe-area-inset-bottom)] sm:hidden"
      >
        {[
          {
            label: 'Tienda',
            action: onHome,
            active: ['catalog', 'product'].includes(activeScreen),
          },
          {
            label: `Carrito (${cartCount})`,
            action: onCart,
            active: activeScreen === 'cart',
          },
          {
            label: 'Mis pedidos',
            action: onHistory,
            active: ['history', 'result'].includes(activeScreen),
          },
        ].map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={item.action}
            aria-current={item.active ? 'page' : undefined}
            className={`min-h-16 text-sm font-semibold ${item.active ? 'text-ghost-plum' : 'text-ghost-muted'}`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
