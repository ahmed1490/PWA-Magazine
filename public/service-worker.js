self.addEventListener('install', function (event) {
    console.log('Event: Install');

    /*event.waitUntil(
     //Add the files to cache here
     );*/
});

self.addEventListener('activate', function (event) {
    console.log('Event: Activate');

});

self.addEventListener('fetch', function (event) {
    console.log('Event: Fetch', event.request.url);

    //Tell the browser to wait for network request and respond with below
    event.respondWith(
        //Check the caches.
        //If request is already in cache, return its response
        //Else, make a fetch and add it to the cache and return the response
    )
});
