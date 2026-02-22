/// <reference lib="webworker" />

// vite-plugin-pwa injects self.__WB_MANIFEST at build time.
// This replaces the auto-generated SW that workbox-build would terser-minify.
declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<{ url: string; revision: string | null }>;
};

const CACHE_NAME = 'orion-v1';

// Precache all assets listed in the injected manifest
const precacheUrls = self.__WB_MANIFEST.map(entry => entry.url);

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(precacheUrls))
  );
  // Activate immediately without waiting for existing tabs to close
  self.skipWaiting();
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  // Remove old caches from previous versions
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      // Cache-first: serve from cache, fall back to network
      return cached ?? fetch(event.request).then(response => {
        // Cache successful network responses for future offline use
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});

