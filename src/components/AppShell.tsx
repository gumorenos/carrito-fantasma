import type { ReactNode } from 'react'
import { BrandMark } from './BrandMark'
import { Button } from './Button'

type AppShellProps = {
  children: ReactNode
  cartCount: number
  onCart: () => void
  onHome: () => void
  onHistory: () => void
  showCart?: boolean
  showHistory?: boolean
}

export function AppShell({ children, cartCount, onCart, onHome, onHistory, showCart = true, showHistory = true }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-ghost-mist pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] text-ghost-ink">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-2 px-4 py-4 sm:px-6 sm:py-6">
        <button
          aria-label="Ir al inicio"
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ghost-teal"
          onClick={onHome}
          type="button"
        >
          <span className="sm:hidden"><BrandMark compact /></span>
          <span className="hidden sm:block"><BrandMark /></span>
        </button>
        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          {showHistory && (
            <Button className="px-2 text-xs sm:px-5 sm:text-sm" onClick={onHistory} variant="quiet">
              Historial
            </Button>
          )}
          {showCart && (
            <Button
              aria-label={`Abrir carrito fantasma. ${cartCount} ${cartCount === 1 ? 'producto' : 'productos'}`}
              className="gap-1 px-2 text-xs sm:gap-1.5 sm:px-5 sm:text-sm"
              onClick={onCart}
              variant="quiet"
            >
              <span aria-hidden="true" className="hidden sm:inline">◌</span>
              <span>Carrito</span>
              <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-ghost-coral px-1.5 py-0.5 text-[11px] font-black leading-4 text-white">
                {cartCount}
              </span>
            </Button>
          )}
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-4 pb-10 outline-none sm:px-6 sm:pb-16" id="main-content" tabIndex={-1}>{children}</main>
      <footer className="mx-auto w-full max-w-5xl px-4 pb-8 text-center text-xs font-medium text-ghost-muted sm:px-6">
        Una simulación segura para darte tiempo antes de decidir.
      </footer>
    </div>
  )
}
