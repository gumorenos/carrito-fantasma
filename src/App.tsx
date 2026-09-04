import { useEffect, useMemo, useRef, useState } from 'react'
import { AppShell } from './components/AppShell'
import { useCart } from './hooks/useCart'
import { useHistory } from './hooks/useHistory'
import { products, stores } from './data'
import { MAX_CART_ITEM_QUANTITY, MAX_CART_TOTAL_ITEMS } from './lib/cart'
import {
  createAnalyticsSessionId,
  getDaysSinceLastSessionBand,
  getDurationBand,
  getValueBand,
  isPwaDisplayMode,
  trackEvent,
} from './lib/analytics'
import { formatPen } from './lib/money'
import { getSimpleRecommendations } from './lib/history'
import { CartScreen } from './screens/CartScreen'
import { CatalogScreen } from './screens/CatalogScreen'
import { CheckoutScreen } from './screens/CheckoutScreen'
import { HistoryScreen } from './screens/HistoryScreen'
import { HomeScreen } from './screens/HomeScreen'
import { ModeSelectorScreen } from './screens/ModeSelectorScreen'
import { ProductDetailScreen } from './screens/ProductDetailScreen'
import { ResultScreen } from './screens/ResultScreen'
import { StoreSelectorScreen } from './screens/StoreSelectorScreen'
import { TrackingScreen } from './screens/TrackingScreen'
import type { GhostCartHistoryEntry, StillWantsToBuy } from './types/history'
import type { AppScreen } from './types/navigation'
import type { AppMode, Product, Store, StoreId, UrgeRating } from './types/product'
import type { RitualSnapshot } from './types/ritual'

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('home')
  const [selectedMode, setSelectedMode] = useState<AppMode | null>(null)
  const [selectedStoreId, setSelectedStoreId] = useState<StoreId | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [detailNotice, setDetailNotice] = useState<string | null>(null)
  const [cartNotice, setCartNotice] = useState<string | null>(null)
  const [ritualSnapshot, setRitualSnapshot] = useState<RitualSnapshot | null>(null)
  const [trackingStep, setTrackingStep] = useState(0)
  const [trackingControlsLocked, setTrackingControlsLocked] = useState(false)
  const [initialUrgeRating, setInitialUrgeRating] = useState<UrgeRating | null>(null)
  const [resultUrgeRating, setResultUrgeRating] = useState<UrgeRating | null>(null)
  const [stillWantsToBuy, setStillWantsToBuy] = useState<StillWantsToBuy | null>(null)
  const [resultSaved, setResultSaved] = useState(false)
  const [resultNotice, setResultNotice] = useState<string | null>(null)
  const resultSaveLock = useRef(false)
  const analyticsSessionId = useRef(createAnalyticsSessionId())
  const flowStarted = useRef(false)
  const appOpenedTracked = useRef(false)
  const checkoutCompletedTracked = useRef(false)
  const trackingStartedTracked = useRef(false)
  const savingRevealedTracked = useRef(false)
  const initialUrgeRatingTracked = useRef(false)
  const urgeRatingTracked = useRef(false)
  const trackingStartedAt = useRef<number | null>(null)
  const trackingUnlockTimeout = useRef<number | null>(null)
  const cart = useCart()
  const history = useHistory()

  useEffect(() => {
    if (appOpenedTracked.current) return
    appOpenedTracked.current = true
    trackEvent('app_opened', {
      has_history: history.entries.length > 0,
      is_pwa: isPwaDisplayMode(),
      session_id: analyticsSessionId.current,
    })
  }, [history.entries.length])

  useEffect(() => () => {
    if (trackingUnlockTimeout.current !== null) window.clearTimeout(trackingUnlockTimeout.current)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    document.getElementById('main-content')?.focus()
  }, [screen])

  const selectedStore = selectedStoreId ? stores.find((store) => store.id === selectedStoreId) : undefined
  const recommendations = useMemo(
    () => getSimpleRecommendations(history.entries, products, cart.items.map((item) => item.productId)),
    [cart.items, history.entries],
  )

  const resetRitualState = () => {
    setRitualSnapshot(null)
    setTrackingStep(0)
    setResultUrgeRating(null)
    setStillWantsToBuy(null)
    setResultSaved(false)
    setResultNotice(null)
    resultSaveLock.current = false
    checkoutCompletedTracked.current = false
    trackingStartedTracked.current = false
    savingRevealedTracked.current = false
    urgeRatingTracked.current = false
    trackingStartedAt.current = null
    setTrackingControlsLocked(false)
    if (trackingUnlockTimeout.current !== null) {
      window.clearTimeout(trackingUnlockTimeout.current)
      trackingUnlockTimeout.current = null
    }
  }

  const goHome = () => {
    setScreen('home')
    setSelectedMode(null)
    setSelectedStoreId(null)
    setSelectedProduct(null)
    setDetailNotice(null)
    setCartNotice(null)
    setInitialUrgeRating(null)
    initialUrgeRatingTracked.current = false
    resetRitualState()
  }

  const startFlow = () => {
    if (flowStarted.current) analyticsSessionId.current = createAnalyticsSessionId()
    flowStarted.current = true
    if (history.entries.length > 0) {
      const lastCompleted = history.entries[0]
      const daysSinceLastSessionBand = getDaysSinceLastSessionBand(lastCompleted.createdAt)
      trackEvent('repeat_session', {
        days_since_last_session_band: daysSinceLastSessionBand ?? undefined,
        previously_completed: true,
        session_id: analyticsSessionId.current,
      })
    }
    setScreen('modes')
    setSelectedMode(null)
    setSelectedStoreId(null)
    setSelectedProduct(null)
    setDetailNotice(null)
    setCartNotice(null)
    setInitialUrgeRating(null)
    initialUrgeRatingTracked.current = false
    resetRitualState()
  }

  const showHistory = () => setScreen('history')

  const getActiveCartStore = (): Store | undefined => {
    const activeStoreId = cart.items[0]?.storeId
    return activeStoreId ? stores.find((store) => store.id === activeStoreId) : undefined
  }

  const confirmCartContextChange = (next: { mode: AppMode; storeId?: StoreId }): boolean => {
    const activeStore = getActiveCartStore()
    if (!activeStore) return true

    const keepsSameContext = next.storeId
      ? activeStore.id === next.storeId
      : activeStore.mode === next.mode
    if (keepsSameContext) return true

    const targetLabel = next.storeId
      ? stores.find((store) => store.id === next.storeId)?.name ?? 'otra tienda'
      : next.mode === 'food' ? 'Pedir comida' : 'Comprar algo'
    const shouldClear = typeof window === 'undefined' || typeof window.confirm !== 'function'
      ? true
      : window.confirm(
        `Tu carrito actual pertenece a ${activeStore.name}. Para cambiar a ${targetLabel}, debes vaciarlo. ¿Vaciar el carrito y continuar? Si eliges Cancelar, conservamos el carrito actual.`,
      )

    if (shouldClear) cart.clearCart()
    return shouldClear
  }

  const showCart = () => {
    setCartNotice(null)
    const cartMode = stores.find((store) => store.id === cart.items[0]?.storeId)?.mode ?? selectedMode ?? 'shopping'
    trackEvent('cart_viewed', {
      item_count: cart.itemCount,
      mode: cartMode,
      session_id: analyticsSessionId.current,
      value_band: getValueBand(cart.subtotal),
    })
    setScreen('cart')
  }

  const enterMode = (mode: AppMode) => {
    if (initialUrgeRating && !initialUrgeRatingTracked.current) {
      trackEvent('urge_rating_submitted', {
        moment: 'before',
        rating: initialUrgeRating,
        session_id: analyticsSessionId.current,
      })
      initialUrgeRatingTracked.current = true
    }
    trackEvent('mode_selected', { mode, session_id: analyticsSessionId.current })
    setSelectedMode(mode)
    setSelectedStoreId(null)
    setSelectedProduct(null)
    setDetailNotice(null)
    setCartNotice(null)
    resetRitualState()
    setScreen('stores')
  }

  const pickMode = (mode: AppMode) => {
    if (!confirmCartContextChange({ mode })) return
    enterMode(mode)
  }

  const selectModeFromHome = (mode: AppMode) => {
    if (!confirmCartContextChange({ mode })) return
    startFlow()
    enterMode(mode)
  }

  const pickStore = (store: Store) => {
    if (!confirmCartContextChange({ mode: store.mode, storeId: store.id })) return
    trackEvent('store_selected', {
      mode: store.mode,
      session_id: analyticsSessionId.current,
      store_id: store.id,
    })
    setSelectedStoreId(store.id)
    setSelectedProduct(null)
    setDetailNotice(null)
    setCartNotice(null)
    resetRitualState()
    setScreen('catalog')
  }

  const openProduct = (product: Product) => {
    trackEvent('product_viewed', {
      category: product.category,
      price_band: getValueBand(product.priceInCents),
      product_id: product.id,
      session_id: analyticsSessionId.current,
      store_id: product.storeId,
    })
    setSelectedProduct(product)
    setDetailNotice(null)
    setCartNotice(null)
    resetRitualState()
    setScreen('product')
  }

  const openRecommendation = (product: Product) => {
    const recommendationStore = stores.find((store) => store.id === product.storeId)
    if (!recommendationStore) return
    if (!confirmCartContextChange({ mode: recommendationStore.mode, storeId: recommendationStore.id })) return
    trackEvent('product_viewed', {
      category: product.category,
      price_band: getValueBand(product.priceInCents),
      product_id: product.id,
      session_id: analyticsSessionId.current,
      store_id: product.storeId,
    })
    setSelectedMode(product.mode)
    setSelectedStoreId(product.storeId)
    setSelectedProduct(product)
    setDetailNotice(null)
    setCartNotice(null)
    resetRitualState()
    setScreen('product')
  }

  const backToModes = () => {
    setSelectedMode(null)
    setSelectedStoreId(null)
    setSelectedProduct(null)
    setDetailNotice(null)
    setCartNotice(null)
    resetRitualState()
    setScreen('modes')
  }

  const backToStores = () => {
    setSelectedStoreId(null)
    setSelectedProduct(null)
    setDetailNotice(null)
    setCartNotice(null)
    resetRitualState()
    setScreen('stores')
  }

  const backToCatalog = () => {
    setSelectedProduct(null)
    setDetailNotice(null)
    setCartNotice(null)
    resetRitualState()
    setScreen('catalog')
  }

  const handleAddToCart = (product: Product) => {
    const cartStoreId = cart.items[0]?.storeId
    const switchingStore = Boolean(cartStoreId && cartStoreId !== product.storeId)
    if (switchingStore && !confirmCartContextChange({ mode: product.mode, storeId: product.storeId })) {
      const cartStoreName = stores.find((store) => store.id === cartStoreId)?.name ?? 'otra tienda'
      setDetailNotice(`Conservamos tu carrito de ${cartStoreName}. Puedes vaciarlo si quieres cambiar de tienda.`)
      return
    }
    const activeItems = switchingStore ? [] : cart.items
    const existingItem = activeItems.find((item) => item.productId === product.id)
    const activeItemCount = switchingStore ? 0 : cart.itemCount
    const canAdd = (existingItem?.quantity ?? 0) < MAX_CART_ITEM_QUANTITY && activeItemCount < MAX_CART_TOTAL_ITEMS
    if (!canAdd) {
      setDetailNotice(existingItem && existingItem.quantity >= MAX_CART_ITEM_QUANTITY
        ? 'Este producto ya llegó al máximo de 20 unidades.'
        : 'Tu carrito ya llegó al máximo de 99 unidades.')
      return
    }

    trackEvent('item_added', {
      cart_value_band: getValueBand((switchingStore ? 0 : cart.subtotal) + product.priceInCents),
      category: product.category,
      product_id: product.id,
      quantity: (existingItem?.quantity ?? 0) + 1,
      session_id: analyticsSessionId.current,
    })
    cart.addItem(product)
    setDetailNotice('Agregado al carrito fantasma. Puedes seguir imaginando sin pagar nada.')
  }

  const startCheckout = () => {
    if (cart.items.length === 0) return

    const firstItemStore = stores.find((store) => store.id === cart.items[0].storeId)
    const cartStoreIds = new Set(cart.items.map((item) => item.storeId))
    if (cartStoreIds.size !== 1) {
      setCartNotice('Tu carrito contiene productos de tiendas distintas. Deja productos de una sola tienda antes de continuar.')
      return
    }
    const checkoutStore = firstItemStore ?? selectedStore
    const checkoutMode = checkoutStore?.mode ?? selectedMode ?? 'shopping'

    trackEvent('fake_checkout_started', {
      item_count: cart.itemCount,
      mode: checkoutMode,
      session_id: analyticsSessionId.current,
      value_band: getValueBand(cart.subtotal),
    })

    setRitualSnapshot({
      items: cart.items.map((item) => ({ ...item })),
      mode: checkoutMode,
      storeId: checkoutStore?.id ?? firstItemStore?.id ?? 'flash-market',
      storeName: checkoutStore?.name ?? 'Tienda ficticia',
      subtotalInCents: cart.subtotal,
      initialUrgeRating: initialUrgeRating ?? undefined,
    })
    setTrackingStep(0)
    setResultUrgeRating(null)
    setStillWantsToBuy(null)
    setResultSaved(false)
    setResultNotice(null)
    setCartNotice(null)
    checkoutCompletedTracked.current = false
    trackingStartedTracked.current = false
    savingRevealedTracked.current = false
    urgeRatingTracked.current = false
    trackingStartedAt.current = null
    setTrackingControlsLocked(false)
    setScreen('checkout')
  }

  const confirmCheckout = () => {
    if (!ritualSnapshot || ritualSnapshot.items.length === 0) return
    if (!checkoutCompletedTracked.current) {
      trackEvent('fake_checkout_completed', {
        item_count: ritualSnapshot.items.reduce((total, item) => total + item.quantity, 0),
        mode: ritualSnapshot.mode,
        session_id: analyticsSessionId.current,
        store_id: ritualSnapshot.storeId,
        value_band: getValueBand(ritualSnapshot.subtotalInCents),
      })
      checkoutCompletedTracked.current = true
    }
    if (!trackingStartedTracked.current) {
      trackingStartedAt.current = Date.now()
      trackEvent('tracking_started', {
        mode: ritualSnapshot.mode,
        session_id: analyticsSessionId.current,
        variant: 'four-step',
      })
      trackingStartedTracked.current = true
    }
    setTrackingControlsLocked(true)
    if (trackingUnlockTimeout.current !== null) window.clearTimeout(trackingUnlockTimeout.current)
    trackingUnlockTimeout.current = window.setTimeout(() => {
      setTrackingControlsLocked(false)
      trackingUnlockTimeout.current = null
    }, 1_500)
    setTrackingStep(0)
    setScreen('tracking')
  }

  const revealSaving = () => {
    if (!ritualSnapshot) return
    if (!savingRevealedTracked.current) {
      const durationInMs = trackingStartedAt.current === null ? 0 : Date.now() - trackingStartedAt.current
      trackEvent('saving_revealed', {
        duration_band: getDurationBand(durationInMs),
        mode: ritualSnapshot.mode,
        session_id: analyticsSessionId.current,
        value_band: getValueBand(ritualSnapshot.subtotalInCents),
      })
      savingRevealedTracked.current = true
    }
    setResultNotice(null)
    setScreen('result')
  }

  const advanceTracking = () => {
    if (trackingControlsLocked) return
    if (trackingStep < 3) {
      setTrackingStep((current) => current + 1)
      return
    }
    revealSaving()
  }

  const skipTracking = () => {
    if (trackingControlsLocked) return
    revealSaving()
  }

  const createLocalId = () => {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
    return `ghost-${Date.now()}-${Math.random().toString(36).slice(2)}`
  }

  const saveResult = () => {
    if (!ritualSnapshot || resultSaved || resultSaveLock.current) return
    resultSaveLock.current = true

    if (resultUrgeRating && !urgeRatingTracked.current) {
      trackEvent('urge_rating_submitted', {
        moment: 'after',
        rating: resultUrgeRating,
        session_id: analyticsSessionId.current,
      })
      urgeRatingTracked.current = true
    }

    const now = new Date()
    const entry: GhostCartHistoryEntry = {
      id: createLocalId(),
      date: now.toISOString().slice(0, 10),
      mode: ritualSnapshot.mode,
      storeId: ritualSnapshot.storeId,
      storeName: ritualSnapshot.storeName,
      items: ritualSnapshot.items.map((item) => ({ ...item })),
      subtotalAvoidedInCents: ritualSnapshot.subtotalInCents,
      categories: [...new Set(ritualSnapshot.items.map((item) => item.category))],
      initialUrgeRating: ritualSnapshot.initialUrgeRating,
      urgeRating: resultUrgeRating ?? undefined,
      stillWantsToBuy: stillWantsToBuy ?? undefined,
      createdAt: now.toISOString(),
    }

    history.saveEntry(entry)
    cart.clearCart()
    setResultSaved(true)
    setResultNotice(history.storageAvailable ? 'Guardado en tu historial local.' : 'Guardado mientras esta pestaña esté abierta; el dispositivo no permitió persistirlo.')
  }

  const simulateAnother = () => {
    cart.clearCart()
    startFlow()
  }

  const shareResult = async () => {
    if (!ritualSnapshot) return

    const text = `Hice una compra fantasma y no gasté ${formatPen(ritualSnapshot.subtotalInCents)}.`
    const shareMethod = typeof navigator !== 'undefined' && typeof navigator.share === 'function'
      ? 'native'
      : typeof navigator !== 'undefined' && Boolean(navigator.clipboard?.writeText)
        ? 'clipboard'
        : 'unavailable'

    trackEvent('share_clicked', {
      includes_amount: true,
      session_id: analyticsSessionId.current,
      share_method: shareMethod,
    })

    try {
      if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
        await navigator.share({ title: 'Carrito Fantasma', text })
        setResultNotice('Listo. Compartiste solo el monto.')
      } else if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
        setResultNotice('Texto copiado. Compártelo cuando quieras.')
      } else {
        setResultNotice('Compartir no está disponible en este navegador.')
      }
    } catch {
      setResultNotice('No se compartió nada. Tu resultado sigue guardado aquí.')
    }
  }

  const recordUrgeRating = (rating: UrgeRating) => {
    setResultUrgeRating(rating)
  }

  const backFromCart = () => {
    setCartNotice(null)
    if (selectedProduct && selectedStore) {
      setScreen('product')
    } else if (selectedStore && selectedMode) {
      setScreen('catalog')
    } else if (selectedMode) {
      setScreen('stores')
    } else {
      setScreen('home')
    }
  }

  const continueFromCart = () => {
    setCartNotice(null)
    if (selectedStore && selectedMode) {
      setScreen('catalog')
    } else if (selectedMode) {
      setScreen('stores')
    } else {
      setScreen('modes')
    }
  }

  const content = (() => {
    if (screen === 'home') return <HomeScreen onHistory={showHistory} onSelectMode={selectModeFromHome} onStart={startFlow} />
    if (screen === 'history') {
      return (
        <HistoryScreen
          entries={history.entries}
          onBack={goHome}
          onClear={history.clear}
          onOpenRecommendation={openRecommendation}
          onStart={startFlow}
          recommendations={recommendations}
          storageAvailable={history.storageAvailable}
        />
      )
    }
    if (screen === 'modes') {
      return (
        <ModeSelectorScreen
          initialUrgeRating={initialUrgeRating}
          onBack={goHome}
          onPick={pickMode}
          onUrgeRatingChange={setInitialUrgeRating}
        />
      )
    }
    if (screen === 'cart') {
      return (
        <CartScreen
          itemCount={cart.itemCount}
          items={cart.items}
          notice={cartNotice}
          onBack={backFromCart}
          onCheckout={startCheckout}
          onClear={cart.clearCart}
          onContinue={continueFromCart}
          onDecrement={cart.decrementItem}
          onIncrement={cart.incrementItem}
          onRemove={cart.removeItem}
          storageAvailable={cart.storageAvailable}
          subtotal={cart.subtotal}
        />
      )
    }
    if (screen === 'checkout' && ritualSnapshot) {
      return <CheckoutScreen onBack={() => setScreen('cart')} onConfirm={confirmCheckout} snapshot={ritualSnapshot} />
    }
    if (screen === 'tracking' && ritualSnapshot) {
      return (
        <TrackingScreen
          controlsLocked={trackingControlsLocked}
          onAdvance={advanceTracking}
          onBack={() => setScreen('checkout')}
          onSkip={skipTracking}
          snapshot={ritualSnapshot}
          step={trackingStep}
        />
      )
    }
    if (screen === 'result' && ritualSnapshot) {
      return (
        <ResultScreen
          notice={resultNotice}
          onNew={simulateAnother}
          onSave={saveResult}
          onShare={shareResult}
          onHistory={showHistory}
          onStillWantsChange={setStillWantsToBuy}
          onUrgeRatingChange={recordUrgeRating}
          saved={resultSaved}
          snapshot={ritualSnapshot}
          stillWantsToBuy={stillWantsToBuy}
          urgeRating={resultUrgeRating}
        />
      )
    }
    if (screen === 'stores' && selectedMode) {
      return <StoreSelectorScreen mode={selectedMode} onBack={backToModes} onSelect={pickStore} />
    }
    if (screen === 'catalog' && selectedMode && selectedStore) {
      return <CatalogScreen mode={selectedMode} onBack={backToStores} onOpenProduct={openProduct} store={selectedStore} />
    }
    if (screen === 'product' && selectedStore && selectedProduct) {
      return (
        <ProductDetailScreen
          notice={detailNotice}
          onAddToCart={() => handleAddToCart(selectedProduct)}
          onBack={backToCatalog}
          product={selectedProduct}
          store={selectedStore}
        />
      )
    }

    return <HomeScreen onHistory={showHistory} onSelectMode={selectModeFromHome} onStart={startFlow} />
  })()

  const ritualScreen = screen === 'checkout' || screen === 'tracking' || screen === 'result'

  return (
    <AppShell
      activeScreen={screen}
      cartCount={cart.itemCount}
      onCart={showCart}
      onExplore={startFlow}
      onHistory={showHistory}
      onHome={goHome}
      showCart={!ritualScreen}
      showHistory={screen !== 'history' && !ritualScreen}
    >
      {content}
    </AppShell>
  )
}
