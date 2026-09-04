import type { ReactNode } from 'react'
import type { AppScreen } from '../types/navigation'
import { BrandMark } from './BrandMark'
import { SimulationBadge } from './SimulationBadge'

type AppShellProps = {
  activeScreen: AppScreen
  children: ReactNode
  cartCount: number
  onCart: () => void
  onExplore: () => void
  onHome: () => void
  onHistory: () => void
  showCart?: boolean
  showHistory?: boolean
}

const calmScreens: AppScreen[] = ['tracking', 'result', 'history']

function NavIcon({ name }: { name: 'home' | 'stores' | 'cart' | 'history' }) {
  const paths = {
    home: <path d="m4 11 8-7 8 7v8a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-8Z" />,
    stores: <><path d="M4 9h16l-2-5H6L4 9Z" /><path d="M6 9v10h12V9M9 19v-5h6v5" /></>,
    cart: <><path d="M4 5h2l2 10h9l2-7H7" /><circle cx="10" cy="19" r="1" /><circle cx="17" cy="19" r="1" /></>,
    history: <><path d="M4 12a8 8 0 1 0 2.3-5.7L4 8.5" /><path d="M4 4v4.5h4.5M12 8v5l3 2" /></>,
  }

  return <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">{paths[name]}</svg>
}

export function AppShell({
  activeScreen,
  children,
  cartCount,
  onCart,
  onExplore,
  onHome,
  onHistory,
  showCart = true,
  showHistory = true,
}: AppShellProps) {
  const calm = calmScreens.includes(activeScreen)
  const showBottomNav = showCart || showHistory
  const browseActive = ['modes', 'stores', 'catalog', 'product'].includes(activeScreen)

  return (
    <div className={`min-h-dvh pb-[env(safe-area-inset-bottom)] text-ghost-ink transition-colors ${calm ? 'bg-[#eef8f4]' : 'bg-ghost-mist'}`}>
      <header className={`sticky top-0 z-40 border-b border-ghost-ink/10 pt-[env(safe-area-inset-top)] shadow-[0_2px_10px_rgba(48,30,42,0.08)] ${calm ? 'bg-ghost-mint' : 'bg-ghost-sun'}`}>
        <div className="mx-auto max-w-6xl px-3 sm:px-6">
          <div className="flex min-h-[58px] items-center justify-between gap-2">
            <button
              aria-label="Ir al inicio"
              className="inline-flex min-h-11 shrink-0 items-center rounded-lg pr-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ghost-plum"
              onClick={onHome}
              type="button"
            >
              <BrandMark compact />
            </button>

            <div className="hidden md:block">
              <SimulationBadge />
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              {showHistory && (
                <button
                  aria-label="Ver historial"
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2.5 text-xs font-extrabold text-ghost-ink transition hover:bg-white/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ghost-plum"
                  onClick={onHistory}
                  type="button"
                >
                  <NavIcon name="history" />
                  <span className="hidden sm:inline">Historial</span>
                </button>
              )}
              {showCart && (
                <button
                  aria-label={`Abrir carrito fantasma. ${cartCount} ${cartCount === 1 ? 'producto' : 'productos'}`}
                  className="relative inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-3 text-xs font-black text-ghost-plum shadow-sm transition hover:bg-ghost-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ghost-plum"
                  onClick={onCart}
                  type="button"
                >
                  <NavIcon name="cart" />
                  <span className="hidden sm:inline">Carrito</span>
                  <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-ghost-coral px-1 text-[10px] leading-5 text-white">{cartCount}</span>
                </button>
              )}
            </div>
          </div>
          <div className="flex pb-2 md:hidden">
            <SimulationBadge />
          </div>
        </div>
      </header>

      <main className={`mx-auto w-full max-w-6xl px-3 pb-24 pt-4 outline-none sm:px-6 sm:pt-6 md:pb-12 ${calm ? 'md:pt-8' : ''}`} id="main-content" tabIndex={-1}>
        {children}
      </main>

      {showBottomNav && (
        <nav aria-label="Navegación principal" className="fixed inset-x-0 bottom-0 z-40 border-t border-ghost-line bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_18px_rgba(48,30,42,0.08)] backdrop-blur md:hidden">
          <div className="mx-auto grid max-w-md grid-cols-4">
            <button className={`flex min-h-[58px] flex-col items-center justify-center gap-1 text-[10px] font-bold ${activeScreen === 'home' ? 'text-ghost-plum' : 'text-ghost-muted'}`} onClick={onHome} type="button"><NavIcon name="home" /><span>Inicio</span></button>
            <button className={`flex min-h-[58px] flex-col items-center justify-center gap-1 text-[10px] font-bold ${browseActive ? 'text-ghost-plum' : 'text-ghost-muted'}`} onClick={onExplore} type="button"><NavIcon name="stores" /><span>Explorar</span></button>
            <button className={`relative flex min-h-[58px] flex-col items-center justify-center gap-1 text-[10px] font-bold ${activeScreen === 'cart' ? 'text-ghost-plum' : 'text-ghost-muted'}`} onClick={onCart} type="button"><span className="relative"><NavIcon name="cart" />{cartCount > 0 && <span className="absolute -right-3 -top-2 min-w-4 rounded-full bg-ghost-coral px-1 text-center text-[9px] leading-4 text-white">{cartCount}</span>}</span><span>Carrito</span></button>
            <button className={`flex min-h-[58px] flex-col items-center justify-center gap-1 text-[10px] font-bold ${activeScreen === 'history' ? 'text-ghost-teal' : 'text-ghost-muted'}`} onClick={onHistory} type="button"><NavIcon name="history" /><span>Historial</span></button>
          </div>
        </nav>
      )}

      <footer className="mx-auto hidden w-full max-w-6xl px-6 pb-8 pt-2 text-center text-xs font-medium text-ghost-muted md:block">
        Una simulación segura para darte tiempo antes de decidir.
      </footer>
    </div>
  )
}
