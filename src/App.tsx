import { useEffect, useRef, useState } from 'react'
import { AppShell } from './components/AppShell'
import { useCart } from './hooks/useCart'
import { useHistory } from './hooks/useHistory'
import { usePreferences } from './hooks/usePreferences'
import { useShopRoute } from './hooks/useShopRoute'
import { products, stores } from './data'
import { MAX_CART_ITEM_QUANTITY, MAX_CART_TOTAL_ITEMS } from './lib/cart'
import {
  createAnalyticsSessionId,
  getValueBand,
  isPwaDisplayMode,
  trackEvent,
} from './lib/analytics'
import {
  newOrderId,
  orderEntry,
  readCheckout,
  writeCheckout,
} from './lib/order'
import { CartScreen } from './screens/CartScreen'
import { CatalogScreen } from './screens/CatalogScreen'
import { CheckoutScreen } from './screens/CheckoutScreen'
import { HistoryScreen } from './screens/HistoryScreen'
import { ProductDetailScreen } from './screens/ProductDetailScreen'
import { ResultScreen } from './screens/ResultScreen'
import type { Product, UrgeRating } from './types/product'
import type { StillWantsToBuy } from './types/history'
import type { RitualSnapshot } from './types/ritual'

const INTRO_KEY = 'carrito-fantasma:v2:intro-seen'
function needsIntro() {
  try {
    return localStorage.getItem(INTRO_KEY) !== '1'
  } catch {
    return true
  }
}
function About({
  onClose,
  rating,
  onRating,
}: {
  onClose: () => void
  rating?: UrgeRating
  onRating: (rating: UrgeRating) => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    dialog.current?.showModal()
  }, [])
  return (
    <dialog
      aria-labelledby="about-title"
      ref={dialog}
      onClose={onClose}
      className="m-auto w-[calc(100%_-_2rem)] max-w-md rounded-2xl border-0 bg-white p-6 text-ghost-ink shadow-xl backdrop:bg-slate-950/50"
    >
      <h2 id="about-title" className="text-2xl font-semibold">
        Bienvenido a Carrito Fantasma
      </h2>
      <p className="mt-4 text-base leading-7 text-ghost-muted">
        Explora una tienda y completa el recorrido de compra sin gastar. Los
        pedidos son una simulación: no habrá cobros ni envíos y no necesitas
        ingresar datos de pago.
      </p>
      <p className="mt-3 text-sm leading-6 text-ghost-muted">
        Tus pedidos y favoritos se guardan en este dispositivo. Esta experiencia
        no es una tienda real.
      </p>
      <details className="mt-4 text-sm">
        <summary className="cursor-pointer">
          Registrar impulso inicial (opcional)
        </summary>
        <p className="mt-3">¿Qué tan fuertes son tus ganas de comprar?</p>
        <div className="mt-2 flex gap-2">
          {([1, 2, 3, 4, 5] as UrgeRating[]).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onRating(value)}
              aria-pressed={rating === value}
              className={`min-h-11 flex-1 rounded-lg border ${rating === value ? 'bg-ghost-plum text-white' : 'border-ghost-line'}`}
            >
              {value}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs">1 Muy leves · 5 Muy fuertes</p>
      </details>
      <form method="dialog">
        <button
          className="mt-6 min-h-12 w-full rounded-lg bg-ghost-plum px-5 font-semibold text-white"
          type="submit"
        >
          Entrar a la tienda
        </button>
      </form>
    </dialog>
  )
}
export default function App() {
  const { route, navigate } = useShopRoute()
  const cart = useCart()
  const history = useHistory()
  const favorites = usePreferences('carrito-fantasma:v2:favorites')
  const recent = usePreferences('carrito-fantasma:v2:recent')
  const [initialRating, setInitialRating] = useState<UrgeRating>()
  const [about, setAbout] = useState(needsIntro)
  const [notice, setNotice] = useState<string | null>(null)
  const [snapshot, setSnapshot] = useState<RitualSnapshot | null>(readCheckout)
  const session = useRef(createAnalyticsSessionId())
  const opened = useRef(false)
  const confirmLock = useRef(false)
  const store = stores.find((item) => item.id === route.storeId) ?? stores[0]
  const product = products.find(
    (item) => item.id === route.productId && item.storeId === store.id,
  )
  const order = history.entries.find((entry) => entry.id === route.productId)
  useEffect(() => {
    if (opened.current) return
    opened.current = true
    trackEvent('app_opened', {
      has_history: history.entries.length > 0,
      is_pwa: isPwaDisplayMode(),
      session_id: session.current,
    })
  }, [history.entries.length])
  const goCatalog = () => {
    setNotice(null)
    navigate({ ...route, screen: 'catalog', productId: undefined })
  }
  const showCart = () => {
    setNotice(null)
    navigate({ ...route, screen: 'cart', productId: undefined })
    trackEvent('cart_viewed', {
      item_count: cart.itemCount,
      mode: store.mode,
      session_id: session.current,
      value_band: getValueBand(cart.subtotal),
    })
  }
  const openProduct = (item: Product) => {
    setNotice(null)
    recent.visit(item.id)
    navigate({
      ...route,
      storeId: item.storeId,
      screen: 'product',
      productId: item.id,
    })
    trackEvent('product_viewed', {
      category: item.category,
      price_band: getValueBand(item.priceInCents),
      product_id: item.id,
      session_id: session.current,
      store_id: item.storeId,
    })
  }
  const add = (item: Product) => {
    if (item.variants?.length && !item.id.includes('::')) {
      openProduct(item)
      return
    }
    const switching =
      cart.items.length > 0 && cart.items[0].storeId !== item.storeId
    if (
      switching &&
      !window.confirm(
        'Tu carrito pertenece a otra tienda. ¿Vaciarlo para agregar este producto?',
      )
    )
      return
    const existing = switching
      ? undefined
      : cart.items.find((line) => line.productId === item.id)
    if (
      (existing?.quantity ?? 0) >= MAX_CART_ITEM_QUANTITY ||
      (!switching && cart.itemCount >= MAX_CART_TOTAL_ITEMS)
    ) {
      setNotice('Llegaste al límite de unidades del carrito.')
      return
    }
    if (switching) cart.clearCart()
    cart.addItem(item)
    setNotice('Agregado al carrito.')
    trackEvent('item_added', {
      cart_value_band: getValueBand(
        (switching ? 0 : cart.subtotal) + item.priceInCents,
      ),
      category: item.category,
      product_id: item.id,
      quantity: (existing?.quantity ?? 0) + 1,
      session_id: session.current,
    })
  }
  const checkout = () => {
    if (!cart.items.length) return
    const cartStore =
      stores.find((item) => item.id === cart.items[0].storeId) ?? store
    const next: RitualSnapshot = {
      initialUrgeRating: initialRating,
      id: newOrderId(),
      createdAt: new Date().toISOString(),
      items: cart.items.map((item) => ({ ...item })),
      subtotalInCents: cart.subtotal,
      mode: cartStore.mode,
      storeId: cartStore.id,
      storeName: cartStore.name,
    }
    setSnapshot(next)
    confirmLock.current = false
    const persisted = writeCheckout(next)
    setNotice(
      persisted
        ? null
        : 'El dispositivo no permite guardar este proceso. Puedes continuar en esta pestaña.',
    )
    navigate({ storeId: cartStore.id, screen: 'checkout' })
    trackEvent('fake_checkout_started', {
      item_count: cart.itemCount,
      mode: cartStore.mode,
      session_id: session.current,
      value_band: getValueBand(cart.subtotal),
    })
  }
  const confirm = () => {
    if (!snapshot || confirmLock.current) return
    confirmLock.current = true
    setInitialRating(undefined)
    const existing = history.entries.find((entry) => entry.id === snapshot.id)
    const persisted = history.saveEntry(existing ?? orderEntry(snapshot))
    if (persisted) {
      cart.clearCart()
      writeCheckout(null)
      setSnapshot(null)
    }
    setNotice(null)
    navigate(
      { storeId: snapshot.storeId, screen: 'result', productId: snapshot.id },
      true,
    )
    if (!existing)
      trackEvent('fake_checkout_completed', {
        item_count: snapshot.items.reduce(
          (sum, item) => sum + item.quantity,
          0,
        ),
        mode: snapshot.mode,
        session_id: session.current,
        store_id: snapshot.storeId,
        value_band: getValueBand(snapshot.subtotalInCents),
      })
  }
  const feedback = (rating?: UrgeRating, wants?: StillWantsToBuy) => {
    if (!order) return
    const persisted = history.saveEntry({
      ...order,
      urgeRating: rating,
      stillWantsToBuy: wants,
    })
    if (persisted && snapshot?.id === order.id) {
      cart.clearCart()
      writeCheckout(null)
      setSnapshot(null)
    }
    if (rating)
      trackEvent('urge_rating_submitted', {
        moment: 'after',
        rating,
        session_id: session.current,
      })
  }
  const catalog = (
    <CatalogScreen
      store={store}
      route={route}
      onChange={(next) => navigate(next, true)}
      onStore={(next) => {
        setNotice(null)
        navigate({ storeId: next.id, screen: 'catalog' })
      }}
      onOpenProduct={openProduct}
      onAdd={add}
      favorites={favorites.values}
      onFavorite={favorites.toggle}
      recent={recent.values}
    />
  )
  let content = catalog
  if (route.screen === 'product')
    content = product ? (
      <ProductDetailScreen
        key={product.id}
        product={product}
        store={store}
        onBack={goCatalog}
        onAddToCart={add}
        onCart={showCart}
        notice={notice}
        favorite={favorites.values.includes(product.id)}
        onFavorite={() => favorites.toggle(product.id)}
      />
    ) : (
      <div className="p-8">
        <h1 className="text-2xl font-semibold">Producto no disponible</h1>
        <button className="mt-3 min-h-11 underline" onClick={goCatalog}>
          Volver a la tienda
        </button>
      </div>
    )
  if (route.screen === 'cart')
    content = (
      <CartScreen
        items={cart.items}
        itemCount={cart.itemCount}
        subtotal={cart.subtotal}
        storageAvailable={cart.storageAvailable}
        notice={notice}
        onBack={goCatalog}
        onContinue={goCatalog}
        onClear={cart.clearCart}
        onIncrement={cart.incrementItem}
        onDecrement={cart.decrementItem}
        onRemove={cart.removeItem}
        onCheckout={checkout}
      />
    )
  if (route.screen === 'checkout')
    content = snapshot ? (
      <CheckoutScreen
        snapshot={snapshot}
        onBack={showCart}
        onConfirm={confirm}
      />
    ) : (
      <div className="p-8">
        <h1 className="text-2xl font-semibold">Retoma tu carrito</h1>
        <p className="mt-2">Este pedido ya no está disponible.</p>
        <button className="mt-3 min-h-11 underline" onClick={showCart}>
          Ver carrito
        </button>
      </div>
    )
  if (route.screen === 'result')
    content = order ? (
      <ResultScreen
        order={order}
        storageAvailable={history.storageAvailable}
        onHistory={() =>
          navigate({ ...route, screen: 'history', productId: undefined })
        }
        onNew={goCatalog}
        onFeedback={feedback}
        onRetry={() => {
          if (history.saveEntry(order) && snapshot?.id === order.id) {
            cart.clearCart()
            writeCheckout(null)
            setSnapshot(null)
          }
        }}
      />
    ) : (
      <div className="p-8">
        <h1 className="text-2xl font-semibold">Pedido no disponible</h1>
        <p className="mt-3">No encontramos este pedido en el dispositivo.</p>
        <button
          className="mt-3 min-h-11 underline"
          onClick={
            snapshot
              ? () =>
                  navigate(
                    { ...route, screen: 'checkout', productId: undefined },
                    true,
                  )
              : goCatalog
          }
        >
          {snapshot ? 'Retomar selección' : 'Volver a la tienda'}
        </button>
      </div>
    )
  if (route.screen === 'history')
    content = (
      <HistoryScreen
        entries={history.entries}
        storageAvailable={history.storageAvailable}
        onBack={goCatalog}
        onOpen={(entry) =>
          navigate({
            storeId: entry.storeId,
            screen: 'result',
            productId: entry.id,
          })
        }
        onClear={() => {
          history.clear()
          writeCheckout(null)
          setSnapshot(null)
        }}
      />
    )
  return (
    <AppShell
      storeName={store.name}
      activeScreen={route.screen}
      cartCount={cart.itemCount}
      onHome={goCatalog}
      onCart={showCart}
      onHistory={() => {
        setNotice(null)
        navigate({ ...route, screen: 'history', productId: undefined })
      }}
      onAbout={() => setAbout(true)}
    >
      {notice && route.screen !== 'product' && route.screen !== 'cart' && (
        <div
          role="status"
          className="mb-4 flex items-center justify-between gap-3 rounded-lg bg-ghost-mint p-3 text-sm"
        >
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice(null)}
            aria-label="Cerrar aviso"
            className="min-h-10 px-3"
          >
            ✕
          </button>
        </div>
      )}
      {content}
      {about && (
        <About
          rating={initialRating}
          onRating={setInitialRating}
          onClose={() => {
            setAbout(false)
            try {
              localStorage.setItem(INTRO_KEY, '1')
            } catch {
              /* Remains dismissed in this tab. */
            }
          }}
        />
      )}
    </AppShell>
  )
}
