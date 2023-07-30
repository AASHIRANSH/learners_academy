const staticCacheName = 'site-static'
const dynamicCacheName = 'site-dynamic-v1'
const assets = [
    "/",
    "/static/css/styles.css",
    "/static/css/animate.min.css",
    "/static/bootstrap-5.2.3-dist/css/bootstrap.min.css",
    "/static/css/styles_fll.css",
    "/static/css/styles.css",
    "/static/css/compof.css",
    "/static/css/responsive.css",
    "/static/fallback/fallback.html"
];

//cache size limit functionn
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size){
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
}
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
                .filter(key => key !== staticCacheName && !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    );
});

//fetch event
self.addEventListener('fetch', evt => {
    console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    limitCacheSize(dynamicCacheName, 15)
                    return fetchRes;
                })
            });
        }).catch(() => {
            if (evt.request.url.indexOf('.html') > -1){
                caches.match('/static/fallback/fallback.html');
            }
        })
    );
});