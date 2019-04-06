var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/index.html',
  '/nomore.png',
  '/clown.png',
  '/manifest.json',
  '/favicon.ico',
  'https://code.jquery.com/jquery-3.3.1.min.js',
  'https://fonts.googleapis.com/css?family=Gloria+Hallelujah',
  'https://fonts.gstatic.com/s/gloriahallelujah/v10/LYjYdHv3kUk9BMV96EIswT9DIbW-MIS11zM.woff2',
  '/sw.js',
  '/jquery-3.3.1.min.js',
  '/materialze.min.js',
  '/jquery-ui.min.ks',
  '/game.js',
  '/font.css',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  '/iconbw.svg',
  '/Splash.js',
  '/regSW.js',
  '/Over.js',
  '/installbutton.js',
  '/music.wav',
  '/time.txt'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

