var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/index.html',
  '/nomore.png',
  '/clown.png',
  '/manifest.json',
  '/sw.js',
  '/jquery-3.3.1.min.js',
  '/materialize.min.js',
  '/materialize.min.css',
  '/jquery-ui.min.js',
  '/game.js',
  '/font.css',
  '/iconbw.svg',
  '/Splash.js',
  '/regSW.js',
  '/Over.js',
  '/installbutton.js',
  '/music.mp3',
  '/time.js',
  '/icon-bg.png',
  '/6aez4K2oVqwIvtU2Hw.woff2',
  '/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
  '/icon-round.png',
  '/icon-web.png',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(function (err) {
        console.log('Cache opening failed: ', err);
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

