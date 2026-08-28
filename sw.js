self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => self.clients.claim());

// Pass-through fetch handler (required by Chrome's install criteria).
// The app needs live network access to call the Gemini API, so we don't
// cache API responses — only fall back to cache for the app shell itself
// if the device is offline.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
