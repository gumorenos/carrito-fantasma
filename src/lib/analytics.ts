import type { PostHog } from 'posthog-js'

export const ANALYTICS_EVENT_NAMES = [
  'app_opened',
  'mode_selected',
  'store_selected',
  'product_viewed',
  'item_added',
  'cart_viewed',
  'fake_checkout_started',
  'fake_checkout_completed',
  'tracking_started',
  'saving_revealed',
  'urge_rating_submitted',
  'share_clicked',
  'repeat_session',
] as const

export type AnalyticsEventName = (typeof ANALYTICS_EVENT_NAMES)[number]

type AnalyticsPrimitive = string | number | boolean

/**
 * This type intentionally stays generic at the boundary. Runtime filtering below
 * is the final privacy guard, so accidental names, text or objects are ignored.
 */
export type AnalyticsProperties = Readonly<Record<string, AnalyticsPrimitive | null | undefined>>

export type ValueBand = 'under-50' | '50-99' | '100-199' | '200-399' | '400-plus'
export type ItemCountBand = '1' | '2-3' | '4-plus'
export type DurationBand = 'under-30s' | '30-90s' | '90s-plus'
export type DaysSinceLastSessionBand = 'same-day' | '1-7d' | '8-30d' | '30d-plus'

const allowedProperties: Record<AnalyticsEventName, readonly string[]> = {
  app_opened: ['session_id', 'is_pwa', 'has_history'],
  mode_selected: ['session_id', 'mode'],
  store_selected: ['session_id', 'mode', 'store_id'],
  product_viewed: ['session_id', 'store_id', 'product_id', 'category', 'price_band'],
  item_added: ['session_id', 'product_id', 'category', 'quantity', 'cart_value_band'],
  cart_viewed: ['session_id', 'mode', 'item_count', 'value_band'],
  fake_checkout_started: ['session_id', 'mode', 'item_count', 'value_band'],
  fake_checkout_completed: ['session_id', 'mode', 'store_id', 'item_count', 'value_band'],
  tracking_started: ['session_id', 'mode', 'variant'],
  saving_revealed: ['session_id', 'mode', 'value_band', 'duration_band'],
  urge_rating_submitted: ['session_id', 'moment', 'rating'],
  share_clicked: ['session_id', 'share_method', 'includes_amount'],
  repeat_session: ['session_id', 'days_since_last_session_band', 'previously_completed'],
}

const eventNameSet = new Set<string>(ANALYTICS_EVENT_NAMES)
const safeEnumValues: Record<string, ReadonlySet<string>> = {
  category: new Set([
    'gadgets',
    'tecnología',
    'gaming',
    'hogar',
    'decoración',
    'belleza',
    'viral',
    'fomo',
    'hamburguesas',
    'pollo',
    'sushi',
    'postres',
    'snacks',
    'bebidas',
  ]),
  days_since_last_session_band: new Set(['same-day', '1-7d', '8-30d', '30d-plus']),
  duration_band: new Set(['under-30s', '30-90s', '90s-plus']),
  moment: new Set(['before', 'after']),
  mode: new Set(['shopping', 'food']),
  price_band: new Set(['under-50', '50-99', '100-199', '200-399', '400-plus']),
  share_method: new Set(['native', 'clipboard', 'unavailable']),
  value_band: new Set(['under-50', '50-99', '100-199', '200-399', '400-plus']),
  variant: new Set(['four-step']),
}
const posthogKey = import.meta.env.VITE_POSTHOG_KEY?.trim() ?? ''
const posthogHost = import.meta.env.VITE_POSTHOG_HOST?.trim() || 'https://us.i.posthog.com'

let posthogClient: PostHog | null = null
let posthogLoad: Promise<PostHog | null> | null = null

function createLocalId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  return `ghost-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function sanitizeProperties(eventName: AnalyticsEventName, properties?: AnalyticsProperties): Record<string, AnalyticsPrimitive> {
  if (!properties) return {}

  const allowed = new Set(allowedProperties[eventName])
  const safe: Record<string, AnalyticsPrimitive> = {}

  for (const [key, value] of Object.entries(properties)) {
    if (!allowed.has(key) || value === null || value === undefined) continue
    if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') continue
    if (typeof value === 'number' && !Number.isFinite(value)) continue
    if (typeof value === 'string' && value.length > 100) continue
    const enumValues = safeEnumValues[key]
    if (enumValues && (typeof value !== 'string' || !enumValues.has(value))) continue
    const numericValue = typeof value === 'number' ? value : null
    if ((key === 'quantity' && (numericValue === null || !Number.isInteger(numericValue) || numericValue < 1 || numericValue > 20)) ||
      (key === 'item_count' && (numericValue === null || !Number.isInteger(numericValue) || numericValue < 0 || numericValue > 99)) ||
      (key === 'rating' && (numericValue === null || !Number.isInteger(numericValue) || numericValue < 1 || numericValue > 5))) continue
    if ((key === 'session_id' || key === 'store_id' || key === 'product_id') &&
      (typeof value !== 'string' || !/^[a-zA-Z0-9-]{1,100}$/.test(value))) continue
    safe[key] = value
  }

  return safe
}

async function getPostHogClient(): Promise<PostHog | null> {
  if (!posthogKey || typeof window === 'undefined') return null
  if (posthogClient) return posthogClient

  if (!posthogLoad) {
    posthogLoad = import('posthog-js')
      .then(({ default: posthog }) => {
        posthogClient = posthog.init(posthogKey, {
          api_host: posthogHost,
          autocapture: false,
          capture_exceptions: false,
          capture_pageleave: false,
          capture_pageview: false,
          disable_persistence: true,
          disable_session_recording: true,
          disable_product_tours: true,
          disable_surveys: true,
          person_profiles: 'never',
          persistence: 'memory',
          respect_dnt: true,
        })
        return posthogClient
      })
      .catch(() => null)
  }

  return posthogLoad
}

/**
 * Central analytics boundary. It is a noop when no PostHog key exists or when
 * the SDK/network is unavailable; product flows never wait for this promise.
 */
export function trackEvent(eventName: AnalyticsEventName, properties?: AnalyticsProperties): void {
  if (!eventNameSet.has(eventName)) return

  const safeProperties = sanitizeProperties(eventName, properties)
  void getPostHogClient().then((client) => {
    if (!client) return
    try {
      client.capture(eventName, safeProperties)
    } catch {
      // Analytics must never interrupt the product flow.
    }
  })
}

export function createAnalyticsSessionId(): string {
  return createLocalId()
}

export function getValueBand(valueInCents: number): ValueBand {
  if (valueInCents < 5000) return 'under-50'
  if (valueInCents < 10000) return '50-99'
  if (valueInCents < 20000) return '100-199'
  if (valueInCents < 40000) return '200-399'
  return '400-plus'
}

export function getItemCountBand(itemCount: number): ItemCountBand {
  if (itemCount <= 1) return '1'
  if (itemCount <= 3) return '2-3'
  return '4-plus'
}

export function getDurationBand(durationInMs: number): DurationBand {
  if (durationInMs < 30_000) return 'under-30s'
  if (durationInMs < 90_000) return '30-90s'
  return '90s-plus'
}

export function getDaysSinceLastSessionBand(createdAt: string, now = Date.now()): DaysSinceLastSessionBand | null {
  const createdAtMs = Date.parse(createdAt)
  if (!Number.isFinite(createdAtMs) || createdAtMs > now) return null

  const days = Math.floor((now - createdAtMs) / 86_400_000)
  if (days === 0) return 'same-day'
  if (days <= 7) return '1-7d'
  if (days <= 30) return '8-30d'
  return '30d-plus'
}

export function isPwaDisplayMode(): boolean {
  if (typeof window === 'undefined') return false

  const standaloneMedia = window.matchMedia?.('(display-mode: standalone)').matches ?? false
  const iosStandalone = Boolean((navigator as Navigator & { standalone?: boolean }).standalone)
  return standaloneMedia || iosStandalone
}
