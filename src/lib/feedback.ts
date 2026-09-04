/**
 * Returns a safe external feedback URL, or null when feedback is not configured.
 * Only http(s) links are exposed to the UI; malformed or script URLs stay hidden.
 */
export function getFeedbackUrl(): string | null {
  const rawUrl = import.meta.env.VITE_FEEDBACK_URL?.trim() ?? ''
  if (!rawUrl) return null

  try {
    const url = new URL(rawUrl)
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null
    if (url.username || url.password) return null
    return url.toString()
  } catch {
    return null
  }
}
