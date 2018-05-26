self.addEventListener('install', event => {
  console.log('[SW] - Installed');
  event.waitUntil(
    caches.open( 'app-v1' ).then( cache => {
      return cache.addAll( [
        './',
        './js/dbhelper.js',
        './js/main.js',
        './js/restaurant_info.js',
        './data/restaurants.json',
        './css/styles.css',
        './img/1.jpg',
        './img/2.jpg',
        './img/3.jpg',
        './img/4.jpg',
        './img/5.jpg',
        './img/6.jpg',
        './img/7.jpg',
        './img/8.jpg',
        './img/9.jpg',
        './img/10.jpg'
      ] );
    }));
});

self.addEventListener('fetch', event => {
  console.log('[SW] - Fetched');
  event.respondWith(
    caches.match( event.request ).then( response => {
      if ( response )return response;
      return fetch( event.request );
    })
  );
});
