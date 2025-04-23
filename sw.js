const CACHE_NAME = "ecommerce-cache-v1";
const urlsToCache = [
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./sw.js", // Cache the service worker itself
  "./images/icon-192.jpg",  // Changed to .jpg
  "./images/icon-512.jpg"   // Changed to .jpg
];

// ✅ Install SW and cache assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("📦 Caching app shell");
      return cache.addAll(urlsToCache).catch(err => {
        console.error('Caching failed for:', err);
      });
    })
  );
});

// ✅ Activate SW and clean old caches
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => !cacheWhitelist.includes(key))
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
  console.log("⚡ Service Worker activated and ready");
});

// ✅ Fetch and cache dynamically
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse; // Serve from cache
      }

      return fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200 && event.request.method === "GET") {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
          });
        }
        return networkResponse;
      }).catch(err => {
        console.error("Fetch failed, serving fallback:", err);
        return caches.match("./index.html"); // Fallback when offline
      });
    })
  );
});

// ✅ Push Notification Handler
self.addEventListener("push", event => {
  const data = event.data?.json() || {};
  const title = data.title || "🛍️ Sale Alert!";
  const options = {
    body: data.body || "Check out our new offers!",
    icon: "./images/icon-192.jpg",  // Changed to .jpg
    badge: "./images/icon-192.jpg"  // Changed to .jpg
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// ✅ Notification Click Handler
self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/") // Redirect to homepage or change to offers page
  );
});
