// ============================================
// BG Tools - Service Worker
// Offline support + Push Notifications
// ============================================

// IMPORTANT: Jab bhi aap site me changes karo aur chahte ho ki
// purana cache turant clear ho jaye, is CACHE_VERSION number ko
// badha do (v1 -> v2 -> v3 ...). Bas itna karna hai.
const CACHE_VERSION = "v1";
const CACHE_NAME = `bg-tools-cache-${CACHE_VERSION}`;

// Ye files hamesha offline available rahengi (app shell)
const PRECACHE_URLS = [
  "/BG-Tools-All-IN-ONE/",
  "/BG-Tools-All-IN-ONE/manifest.json",
];

// ---------- INSTALL ----------
// Jab service worker pehli baar install hota hai, app shell cache karo
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting(); // naya service worker turant active ho
});

// ---------- ACTIVATE ----------
// Purane cache versions ko delete karo (cache-busting)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim(); // sabhi open tabs par turant control lo
});

// ---------- FETCH ----------
// Strategy: Network First, Cache Fallback
// -> Agar internet hai, hamesha latest (updated) content dikhega
// -> Agar internet nahi hai, cached (offline) version dikhega
self.addEventListener("fetch", (event) => {
  // Sirf GET requests handle karo (POST/API calls ko chhod do)
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Naya response mila -> cache update karo taaki
        // agli baar offline hone par ye latest version mile
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return networkResponse;
      })
      .catch(() => {
        // Internet nahi hai -> cache se try karo
        return caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || caches.match("/BG-Tools-All-IN-ONE/");
        });
      })
  );
});

// ---------- PUSH NOTIFICATIONS ----------
// Jab server (Firebase Cloud Messaging) se push message aaye
self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { title: "BG Tools", body: event.data ? event.data.text() : "" };
  }

  const title = data.title || "BG Tools";
  const options = {
    body: data.body || "Naya update available hai!",
    icon: "/BG-Tools-All-IN-ONE/icons/icon-192.png",
    badge: "/BG-Tools-All-IN-ONE/icons/icon-192.png",
    data: {
      url: data.url || "/BG-Tools-All-IN-ONE/",
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Jab user notification par click kare, app khol do
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "/BG-Tools-All-IN-ONE/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(targetUrl) && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
