import type { Store } from '../types/product'

type StoreVisualProps = {
  store: Store
  className?: string
}

const icons: Record<Store['id'], string> = {
  'flash-market': '⚡',
  'todo-innecesario': '🪩',
  'wishlist-club': '✦',
  'antojo-go': '🍔',
}

export function StoreVisual({ store, className = '' }: StoreVisualProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative isolate flex items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundColor: `${store.accentColor}20`, color: store.accentColor }}
    >
      <span className="absolute -right-4 -top-5 h-16 w-16 rounded-full bg-white/55" />
      <span className="absolute -bottom-6 -left-4 h-14 w-14 rounded-full border-[9px] border-white/50" />
      <span className="relative text-[2.4rem] drop-shadow-sm">{icons[store.id]}</span>
    </div>
  )
}
