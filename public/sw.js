/* global caches, fetch, Response, self, URL */

const CACHE_NAME = 'carrito-fantasma-shell-v1'
const APP_SHELL = [
  '/',
  '/manifest.webmanifest',
  '/icon.svg',
  '/icon-192.svg',
  '/icon-512.svg',
  '/product-placeholder.svg',
  '/store-placeholder.svg',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith('carrito-fantasma-shell-') && key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      ))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const requestUrl = new URL(event.request.url)
  if (requestUrl.origin !== self.location.origin) return

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone()
          void caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy))
        }
        return response
      })
      .catch(() => caches.match(event.request).then((cached) => {
        if (cached) return cached
        return event.request.mode === 'navigate' ? caches.match('/') : Response.error()
      })),
  )
})
