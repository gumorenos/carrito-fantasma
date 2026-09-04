import type { ProductCategory } from '../types/product'

type ProductVisualProps = {
  category: ProductCategory
  name: string
  className?: string
  showLabel?: boolean
}

const visuals: Record<ProductCategory, { icon: string; background: string; accent: string }> = {
  gadgets: { icon: '🔋', background: '#e1f2f7', accent: '#27768b' },
  tecnología: { icon: '⌨️', background: '#e7e3f6', accent: '#6a50a1' },
  gaming: { icon: '🎮', background: '#e5dcf0', accent: '#613b80' },
  hogar: { icon: '🪴', background: '#e1f0df', accent: '#4d7a48' },
  decoración: { icon: '💡', background: '#fff0c7', accent: '#a66b10' },
  belleza: { icon: '🧴', background: '#f9dfe9', accent: '#a84c70' },
  viral: { icon: '✨', background: '#eee0f5', accent: '#8754a0' },
  fomo: { icon: '🛍️', background: '#ffe3d9', accent: '#ae5334' },
  hamburguesas: { icon: '🍔', background: '#ffe3bd', accent: '#b25c18' },
  pollo: { icon: '🍗', background: '#f8dfbd', accent: '#a45b20' },
  sushi: { icon: '🍣', background: '#dcefe9', accent: '#34796c' },
  postres: { icon: '🍰', background: '#f9dfeb', accent: '#a54870' },
  snacks: { icon: '🍿', background: '#fff0bd', accent: '#a46c16' },
  bebidas: { icon: '🥤', background: '#dcecf8', accent: '#356f98' },
}

export function ProductVisual({ category, name, className = '', showLabel = true }: ProductVisualProps) {
  const visual = visuals[category]

  return (
    <div
      aria-hidden="true"
      className={`relative isolate flex items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundColor: visual.background, color: visual.accent }}
    >
      <span className="absolute -right-[18%] -top-[30%] h-[85%] w-[85%] rounded-full border-[14px] border-white/30" />
      <span className="absolute -bottom-[45%] -left-[15%] h-[80%] w-[80%] rounded-full bg-white/25" />
      <span className="relative drop-shadow-[0_8px_10px_rgba(55,35,48,0.14)] [font-size:clamp(2.6rem,13vw,5.2rem)]">{visual.icon}</span>
      {showLabel && <span className="absolute bottom-2.5 left-3 right-3 truncate text-[10px] font-black uppercase tracking-[0.08em] opacity-70">{name.split(' ').slice(0, 2).join(' ')}</span>}
    </div>
  )
}
