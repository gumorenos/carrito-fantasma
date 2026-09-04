import { Component, type ErrorInfo, type ReactNode } from 'react'

type AppErrorBoundaryProps = {
  children: ReactNode
}

type AppErrorBoundaryState = {
  hasError: boolean
}

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) console.error('Carrito Fantasma render error', error, errorInfo)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="flex min-h-dvh items-center justify-center bg-ghost-mist px-5 py-10 text-ghost-ink">
        <section className="w-full max-w-md rounded-[2rem] border border-ghost-line bg-white p-7 text-center shadow-soft">
          <div aria-hidden="true" className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-ghost-mint text-4xl text-ghost-teal">◌</div>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-ghost-coral">Pausa inesperada</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight">Algo se desvió</h1>
          <p className="mt-3 leading-7 text-ghost-muted">No se perdió ninguna compra real. Recarga la app para volver al inicio del ritual.</p>
          <button
            className="mt-7 min-h-12 w-full rounded-2xl bg-ghost-teal px-5 py-3 text-sm font-black text-white transition hover:bg-ghost-tealDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ghost-teal"
            onClick={() => window.location.reload()}
            type="button"
          >
            Recargar Carrito Fantasma
          </button>
        </section>
      </main>
    )
  }
}
