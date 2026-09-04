import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'quiet'
}

export function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  const variants = {
    primary:
      'bg-ghost-teal text-white shadow-[0_12px_24px_rgba(22,121,109,0.24)] hover:bg-ghost-tealDark focus-visible:outline-ghost-teal',
    secondary:
      'border border-ghost-line bg-white text-ghost-ink shadow-sm hover:border-ghost-mintStrong hover:bg-ghost-mist focus-visible:outline-ghost-teal',
    quiet:
      'text-ghost-teal hover:bg-white/70 focus-visible:outline-ghost-teal',
  }

  return (
    <button
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}
