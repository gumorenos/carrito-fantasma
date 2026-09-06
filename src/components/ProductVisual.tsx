import { useState } from 'react'
import type { ProductCategory } from '../types/product'
type ProductVisualProps = {
  category: ProductCategory
  name: string
  imageUrl?: string
  className?: string
  showLabel?: boolean
}
export function ProductVisual({
  category,
  name,
  imageUrl,
  className = '',
}: ProductVisualProps) {
  const [failed, setFailed] = useState<string | null>(null)
  return (
    <div
      className={`product-photo relative flex items-center justify-center overflow-hidden bg-[#f5f6f7] ${className}`}
    >
      {imageUrl && failed !== imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className={
            [
              'pizzas',
              'pastas',
              'ensaladas',
              'platos',
              'hamburguesas',
              'pollo',
              'sushi',
              'postres',
              'snacks',
              'bebidas',
            ].includes(category)
              ? 'h-full w-full object-cover'
              : 'h-full w-full object-contain p-3 mix-blend-multiply'
          }
          loading="lazy"
          decoding="async"
          onError={() => setFailed(imageUrl)}
        />
      ) : (
        <span className="p-4 text-center text-sm text-ghost-muted">
          Imagen no disponible
        </span>
      )}
    </div>
  )
}
