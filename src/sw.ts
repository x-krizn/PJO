/// <reference lib="webworker" />

// vite-plugin-pwa injects self.__WB_MANIFEST at build time.
declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<{ url: string; revision: string | null }>;
};

// ── CACHE VERSIONING ──────────────────────────────────────────────────────────
// IMPORTANT: bump this string on every deploy that changes app files.
// The activate handler deletes all caches that don't match this name,
// which forces a clean fetch of all updated assets.
//
// Convention: 'orion-vMAJOR.MINOR' — bump minor on each session's deploy,
// major on milestone releases.
//
// Current: session 1 complete (P0-A through P2-B)
const CACHE_NAME = 'orion-v1.1';

const precacheUrls = self.__WB_MANIFEST.map(entry => entry.url);

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(precacheUrls))
  );
  // Take over immediately — don't wait for existing tabs to close
  self.skipWaiting();
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  // Delete ALL caches from previous versions.
  // Because CACHE_NAME changed, the old 'orion-v1' cache is deleted here,
  // forcing the browser to fetch fresh assets on next load.
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
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // ── Network-first for index.html ────────────────────────────────────────
  // index.html is not content-hashed by Vite (it's always "index.html").
  // Serving it cache-first means the app shell is stale until cache is cleared.
  // Network-first ensures the latest shell is always fetched when online,
  // falling back to cache only when offline.
  if (url.pathname === '/' || url.pathname.endsWith('index.html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then(cached => cached ?? Response.error()))
    );
    return;
  }

  // ── Cache-first for all other assets ────────────────────────────────────
  // Vite content-hashes all JS/CSS/asset filenames (e.g. main.abc123.js).
  // A changed file gets a new URL, so cache-first is safe — stale entries
  // are simply never requested again, and new deploys bring new URLs.
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached ?? fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
