let cacheName = 'app-v1';

self.addEventListener('install', function( e ) {
  console.log('[ServiceWorker] instaled');
  e.waitUntil(
    caches.open( cacheName ).then( function( cache ) {
      console.log('[ServiceWorker] caches.open '+ cacheName);
      return cache.addAll([
        '/',
        'js/main.js',
        'js/restaurant_info.js',
        'data/restaurants.json',
        'css/styles.css',
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
        'img/7.jpg',
        'img/8.jpg',
        'img/9.jpg',
        'img/10.jpg'
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
});

self.addEventListener('fetch', function( event ) {
  console.log('[ServiceWorker] fetched');
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request)
        .then( function(res) {
          if (!res || res.status !== 200|| res.type !== 'basic') {
            return res;
          }

          let resp = res.clone();
          caches.open(cacheName).then( function(cache) {
              cache.put(event.request, resp);
            });
          return res;

        })
    })
  )
});
