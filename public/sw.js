// Service Worker — hand-rolled, no Workbox dependency
// Strategy: CacheFirst for API data & sprites, NetworkFirst for app shell
// NOTE: Only active in production builds (registration is guarded by import.meta.env.PROD)

const SHELL_CACHE = "shell-v2";
const API_CACHE = "pokeapi-data-v1";
const IMG_CACHE = "pokeapi-sprites-v1";

const SHELL_ASSETS = [
  "/dexhelper/",
  "/dexhelper/index.html",
  "/dexhelper/manifest.json",
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;900&display=swap",
];

// ── Install: pre-cache app shell ─────────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) =>
      // Use individual adds so one failure doesn't block the whole install
      Promise.allSettled(SHELL_ASSETS.map((url) => cache.add(url))),
    ),
  );
  self.skipWaiting();
});

// ── Activate: clean up old caches ────────────────────────────────────────────
self.addEventListener("activate", (event) => {
  const CURRENT = new Set([SHELL_CACHE, API_CACHE, IMG_CACHE]);
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => !CURRENT.has(k)).map((k) => caches.delete(k)),
        ),
      ),
  );
  self.clients.claim();
});

// ── Helpers ───────────────────────────────────────────────────────────────────

// staleWhileRevalidate: serve from cache, but always fetch in background to update
async function staleWhileRevalidate(request, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request)
    .then(async (response) => {
      if (response.ok || response.status === 0) {
        const headers = new Headers(response.headers);
        headers.set("sw-fetched-at", String(Date.now()));
        const stamped = new Response(await response.clone().arrayBuffer(), {
          status: response.status,
          statusText: response.statusText,
          headers,
        });
        await cache.put(request, stamped);

        const keys = await cache.keys();
        if (keys.length > maxEntries) {
          await Promise.all(
            keys.slice(0, keys.length - maxEntries).map((k) => cache.delete(k)),
          );
        }
      }
      return response;
    })
    .catch(() => cached || fetch(request));

  return cached || fetchPromise;
}

// CacheFirst: serve from cache, fall back to network and store result
async function cacheFirst(request, cacheName, maxEntries, maxAgeMs) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    const fetched = cached.headers.get("sw-fetched-at");
    if (fetched && Date.now() - Number(fetched) < maxAgeMs) {
      return cached;
    }
  }

  try {
    const response = await fetch(request);
    if (response.ok || response.status === 0) {
      const headers = new Headers(response.headers);
      headers.set("sw-fetched-at", String(Date.now()));
      const stamped = new Response(await response.clone().arrayBuffer(), {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
      await cache.put(request, stamped);

      const keys = await cache.keys();
      if (keys.length > maxEntries) {
        await Promise.all(
          keys.slice(0, keys.length - maxEntries).map((k) => cache.delete(k)),
        );
      }
    }
    return response;
  } catch {
    // Offline — return stale cache if available, otherwise let browser handle it
    return cached || fetch(request);
  }
}

// NetworkFirst: try network, fall back to cache (for app shell)
async function networkFirst(request) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await cache.match(request);
    // Return cache hit, or re-throw to let the browser show its own offline page
    if (cached) return cached;
    throw new Error("Offline and no cached response available");
  }
}

// ── Fetch ─────────────────────────────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const { url } = request;

  // Only handle GET requests — skip POST, PUT, etc.
  if (request.method !== "GET") return;

  // Only handle http(s) — skip chrome-extension://, data:, etc.
  if (!url.startsWith("http")) return;

  // PokeAPI JSON — StaleWhileRevalidate, up to 1000 entries
  if (/^https:\/\/pokeapi\.co\/api\/v2\//i.test(url)) {
    event.respondWith(staleWhileRevalidate(request, API_CACHE, 1000));
    return;
  }

  // PokeAPI sprites — CacheFirst, 1 year TTL, up to 2000 entries
  if (/^https:\/\/raw\.githubusercontent\.com\/PokeAPI\/sprites\//i.test(url)) {
    event.respondWith(
      cacheFirst(request, IMG_CACHE, 2000, 365 * 24 * 60 * 60 * 1000),
    );
    return;
  }

  // Google Fonts — CacheFirst, 30 days
  if (/^https:\/\/fonts\.(googleapis|gstatic)\.com\//i.test(url)) {
    event.respondWith(
      cacheFirst(request, SHELL_CACHE, 50, 30 * 24 * 60 * 60 * 1000),
    );
    return;
  }

  // App shell navigation — NetworkFirst
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  // Same-origin static assets (JS, CSS, fonts) — NetworkFirst
  if (url.includes("/dexhelper/") && !url.includes("?")) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Everything else — let the browser handle it natively (no SW involvement)
});
