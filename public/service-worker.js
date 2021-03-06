//Cache polyfil to support cacheAPI in all browsers
importScripts('./cache-polyfill.js');

const cacheName = 'z.fm-v1';

const filesToCache = [
  './',
  './index.html',
  '/static/js/bundle.js',
  './js/offline.js',
  './js/toast.js',
  '/cache-polyfill.js',
  './manifest.json'
];

self.addEventListener('install', function (event) {
    console.log('Event: Install');

    event.waitUntil( //this ensures that the service worker will not install until the code inside waitUntil() has successfully occurred.
        caches.open('z.fm-v1')
        .then(function(cache) {
            return cache.addAll(filesToCache)
            .then(function () {
                console.info('All files are cached');
                return self.skipWaiting(); //To forces the waiting service worker to become the active service worker
            })
            .catch(function (error) {
                console.error('Failed to cache', error);
            })
        })
    );
});


self.addEventListener('fetch', function (event) {
    console.log('Event: Fetch', event.request.url);

    var request = event.request;


    //Tell the browser to wait for newtwork request and respond with below
    event.respondWith(
      //Tell the browser to wait for network request and respond with below
      caches.match(request).then(function(response) {
        console.log('response from cache', response);
        if (response) {
          console.log('from cache url', response.url);
          return response;
        }

        //if request is not cached, add it to cache
        console.log('fetching', request.url);
        return fetch(request, {mode: 'no-cors'})
          .then((response) => {
              var responseToCache = response.clone();

              caches.open(cacheName).then((cache) => {
                  cache.put(request, responseToCache)
                      .then(() => console.log('to cache', response.url))
                      .catch(function(err) {
                        console.warn(request.url + ': ' + err.message);
                      });
                });

              return response;
          });
      })
    );
});



/*
  ACTIVATE EVENT: triggered once after registering, also used to clean up caches.
*/

//Adding `activate` event listener
self.addEventListener('activate', function (event) {
  console.info('Event: Activate');

  //Remove old and unwanted caches
  event.waitUntil( 
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cache) {
          if (cache !== cacheName) {     //cacheName = 'cache-v1'
            return caches.delete(cache); //Deleting the cache
          }
        })
      );
    })
  );
});