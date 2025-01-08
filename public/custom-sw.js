// Service Worker with proper scope handling
const CACHE_NAME = "app-static-v2";

// Files to pre-cache
const ASSETS_TO_CACHE = [
  "/",              // Root
  "/index.html",    // Main HTML file
  "/offline.html"   // Offline fallback page
];

// Install event: Cache essential files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event: Delete old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch event: Serve cached files or fetch from network
self.addEventListener("fetch", (event) => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(event.request)
            .then((response) => {
              // Cache new files dynamically
              return caches.open(CACHE_NAME).then((cache) => {
                // Cache only GET requests, avoid caching POST, PUT, etc.
                if (event.request.method === "GET") {
                  cache.put(event.request, response.clone());
                }
                return response;
              });
            })
            .catch(() => {
              // Return offline.html for navigation requests if offline
              if (event.request.mode === "navigate") {
                return caches.match("/offline.html");
              }
            })
        );
      })
    );
  }
});

// Sync event: Sync pending claims
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-claim-docs") {
    event.waitUntil(syncPendingClaims());
  }
});

const syncPendingClaims = async () => {
  console.log("Syncing pending claims...");
};
