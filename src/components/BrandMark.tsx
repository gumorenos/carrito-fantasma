import ghostMark from '../assets/ghost-mark.svg'

type BrandMarkProps = {
  compact?: boolean
}

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <div className={`flex items-center ${compact ? 'gap-2' : 'gap-3'}`}>
      <img
        alt=""
        aria-hidden="true"
        className={compact ? 'h-9 w-9 rounded-lg shadow-sm' : 'h-11 w-11 rounded-xl shadow-sm'}
        src={ghostMark}
      />
      <div className={`${compact ? 'max-[359px]:hidden' : ''} leading-tight`}>
        <p className={`${compact ? 'text-xs' : 'text-sm'} font-black tracking-[-0.02em] text-ghost-ink`}>Carrito</p>
        <p className={`${compact ? 'text-xs' : 'text-sm'} font-black tracking-[-0.02em] text-ghost-plum`}>Fantasma</p>
      </div>
    </div>
  )
}
