import { useState } from 'react'
import { Button } from '../components/Button'
import { ProductVisual } from '../components/ProductVisual'
import { productCategoryLabels } from '../data'
import { formatPen } from '../lib/money'
import type { Product, Store } from '../types/product'
type Props = {
  product: Product
  store: Store
  onBack: () => void
  onAddToCart: (product: Product) => void
  onCart: () => void
  notice?: string | null
  favorite: boolean
  onFavorite: () => void
}
export function ProductDetailScreen({
  product,
  store,
  onBack,
  onAddToCart,
  onCart,
  notice,
  favorite,
  onFavorite,
}: Props) {
  const [selectedImage, setSelectedImage] = useState(product.imageUrl)
  const [variant, setVariant] = useState(product.variants?.[0])
  const images = product.images?.length ? product.images : [product.imageUrl]
  const configured = variant
    ? {
        ...product,
        id: `${product.id}::${variant.id}`,
        name: `${product.name} · ${variant.label}`,
      }
    : product
  return (
    <section className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="min-h-11 text-sm text-ghost-muted"
      >
        ← {store.name} / {productCategoryLabels[product.category]}
      </button>
      <article className="grid gap-6 rounded-xl border border-ghost-line bg-white p-4 sm:p-7 md:grid-cols-2 lg:gap-10">
        <div>
          <ProductVisual
            imageUrl={selectedImage}
            category={product.category}
            name={product.name}
            className="aspect-square w-full rounded-lg"
          />
          {images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {images.map((url, index) => (
                <button
                  key={url}
                  type="button"
                  aria-label={`Ver imagen ${index + 1}`}
                  aria-pressed={url === selectedImage}
                  onClick={() => setSelectedImage(url)}
                  className={`h-20 w-20 overflow-hidden rounded-lg border-2 ${url === selectedImage ? 'border-ghost-plum' : 'border-ghost-line'}`}
                >
                  <img
                    src={url}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-ghost-muted">
            {productCategoryLabels[product.category]}
          </p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight">
            {product.name}
          </h1>
          <p className="mt-4 text-3xl font-bold">
            {formatPen(product.priceInCents)}
          </p>
          <p className="mt-5 text-base leading-7 text-ghost-muted">
            {product.description}
          </p>
          {product.specifications?.length ? (
            <ul className="mt-5 space-y-2 border-t border-ghost-line pt-5 text-sm">
              {product.specifications.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
          ) : null}
          {product.variants?.length ? (
            <fieldset className="mt-6">
              <legend className="mb-2 text-sm font-semibold">
                Elige una opción
              </legend>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={variant?.id === option.id}
                    onClick={() => setVariant(option)}
                    className={`min-h-11 rounded-lg border px-4 text-sm ${variant?.id === option.id ? 'border-ghost-plum bg-ghost-plum text-white' : 'border-ghost-line'}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}
          <div className="mt-8 space-y-3 md:mt-auto md:pt-8">
            <Button className="w-full" onClick={() => onAddToCart(configured)}>
              Agregar al carrito
            </Button>
            <button
              type="button"
              onClick={onFavorite}
              aria-pressed={favorite}
              className="min-h-11 w-full text-sm font-semibold"
            >
              {favorite ? '♥ Guardado en favoritos' : '♡ Guardar en favoritos'}
            </button>
            {notice && (
              <div
                role="status"
                className="rounded-lg bg-ghost-mint p-4 text-sm"
              >
                <p>{notice}</p>
                <button
                  type="button"
                  onClick={onCart}
                  className="mt-2 min-h-10 font-semibold underline"
                >
                  Ver carrito
                </button>
              </div>
            )}
          </div>
        </div>
      </article>
    </section>
  )
}
