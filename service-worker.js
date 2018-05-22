let cacheName = 'test-v8';

self.addEventListener('install', function( e ) {
  console.log('[ServiceWorker] instaled');
  e.waitUntil(
    caches.open( cacheName ).then( function( cache ) {
      console.log('[ServiceWorker] caching cacheFiles');
      return cache.addAll([
        '/.',
        'js/main.js',
        'js/restaurant_info.js',
        'data/restaurants.json',
        'css/styles.css',
        'img/'
      ]);
    })
  );
});


self.addEventListener('activate', function( event ) {
  console.log('[ServiceWorker] activated');
  event.waitUntil(
    caches.keys().then( function(cacheNames) {
      return Promise.all(cacheNames.map(function(thisCacheName) {
        if (thisCacheName !== cacheName) {
          console.log('[ServiceWorker] Removing Cached Files From', thisCacheName);
          return caches.delete(thisCacheName);
        }
      }))
    })
  )
})

self.addEventListener('fetch', function( event ) {
  console.log('[ServiceWorker] fetched', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response
      return fetch(event.request);
    })
  )
})
