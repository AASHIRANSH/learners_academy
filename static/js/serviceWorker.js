const staticCacheName = 'site-static'
const assets = [
    '/',
    '/static/css/styles.css',
    ''
];

self.addEventListener('install', evt => {
    console.log('service worker has been installed');
    caches.open(staticCacheName).then(cache => {
        cache.addAll(assets)
    })
});

//activate event
self.addEventListener('activate', evt => {
    console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete())
            )
        })
    );
});

//fetch event
self.addEventListener('fetch', evt => {
    console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request)
        })
    );
});