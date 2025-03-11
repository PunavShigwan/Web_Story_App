const CACHE_NAME = 'pratilipi-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/story.html',
  '/reader.html',
  '/styles.css',
  '/story-styles.css',
  '/reader-styles.css',
  '/script.js',
  '/story.js',
  '/reader.js',
  '/manifest.json',
  '/icons/icon-192x192.png',
  // Add other assets you want to cache
];

// Install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Activate service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

// Fetch event handler
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch new version
        return response || fetch(event.request);
      })
  );
}); 