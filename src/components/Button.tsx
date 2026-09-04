import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'quiet'
}

export function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  const variants = {
    primary:
      'bg-ghost-plum text-white shadow-[0_8px_18px_rgba(92,40,77,0.22)] hover:bg-ghost-plumDark focus-visible:outline-ghost-plum',
    secondary:
      'border border-ghost-line bg-white text-ghost-ink shadow-sm hover:border-ghost-plum/30 hover:bg-ghost-sunSoft focus-visible:outline-ghost-plum',
    quiet:
      'text-ghost-plum hover:bg-white/70 focus-visible:outline-ghost-plum',
  }

  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-extrabold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}
