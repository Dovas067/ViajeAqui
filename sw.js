const CACHE_NAME = 'viajeaqui-v2';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './utils.js',
  './manifest.json',
  // Add other critical assets like icons
  './icon-48.png',
  './icon-72.png',
  './icon-96.png',
  './icon-144.png',
  './icon-192.png',
  './icon-256.png',
  './icon-512.png',
];

// URLs that should be cached but are not part of the app shell (e.g., Leaflet)
const STATIC_ASSETS = [
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL.concat(STATIC_ASSETS)))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // App Shell & Critical Static Assets: Cache First
  if (APP_SHELL.some(path => url.pathname.endsWith(path.replace('./', '/')) || STATIC_ASSETS.includes(url.href))) {
    event.respondWith(caches.match(event.request).then(r => r || fetch(event.request)));
    return;
  }

  // API & Map Tiles: Stale-While-Revalidate
  // This is a good strategy for data that changes. It serves cached content immediately while fetching a new version in the background.
  if (url.hostname.includes('api.open-meteo.com') || url.hostname.includes('api.exchangerate.host') || url.hostname.includes('overpass-api.de') || url.hostname.includes('tile.openstreetmap.org')) {
    event.respondWith(
      caches.open('runtime').then(cache => {
        return cache.match(event.request).then(cachedResponse => {
          const fetchPromise = fetch(event.request).then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(err => {
            console.error('Fetch failed:', err);
            return new Response('Offline: fetch failed');
          });

          return cachedResponse || fetchPromise;
        });
      })
    );
    return;
  }

  // Fallback for other requests (e.g., icons not in shell, etc.)
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        return new Response('App is offline and this resource is not cached.', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      });
    })
  );
});