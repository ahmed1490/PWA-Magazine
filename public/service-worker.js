//Cache polyfil to support cacheAPI in all browsers
importScripts('./cache-polyfill.js');

const cacheName = 'z.fm-v1';

const filesToCache = [
  './',
  '/static/js/bundle.js'
];

self.addEventListener('install', function (event) {
    event.waitUntil( //this ensures that the service worker will not install until the code inside waitUntil() has successfully occurred.
        caches.open('z.fm-v1')
        .then(function(cache) {
            return cache.addAll(filesToCache)
            .then(function () {
                return self.skipWaiting(); //To forces the waiting service worker to become the active service worker
            })
            .catch(function (error) {
                console.error('Failed to cache', error);
            })
        })
    );
});


self.addEventListener('fetch', function (event) {
    var request = event.request;

    //Tell the browser to wait for network request and respond with below
    caches.match(request).then(function(response) {
      if (response) {
        return response;
      }

      //if request is not cached, add it to cache
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
});



/*
  ACTIVATE EVENT: triggered once after registering, also used to clean up caches.
*/

//Adding `activate` event listener
self.addEventListener('activate', function (event) {
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