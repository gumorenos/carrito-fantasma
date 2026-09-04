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
        className={compact ? 'h-9 w-9 rounded-xl' : 'h-11 w-11 rounded-2xl'}
        src={ghostMark}
      />
      <div className={`${compact ? 'max-[359px]:hidden' : ''} leading-tight`}>
        <p className={`${compact ? 'text-xs' : 'text-sm'} font-extrabold tracking-tight text-ghost-ink`}>Carrito</p>
        <p className={`${compact ? 'text-xs' : 'text-sm'} font-extrabold tracking-tight text-ghost-teal`}>Fantasma</p>
      </div>
    </div>
  )
}
