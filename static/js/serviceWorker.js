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
    evt.waitUntil(
        caches.open(staticCacheName)
        .then(cache => {
            return cache.addAll(assets);
        })
    );
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
        caches.match(evt.request) ||
            fetch(evt.request)
    )
});

btnAdd.addEventListener('click', (e) => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2Hs Prompt');
        }
        deferredPrompt = null;
    });
});

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    btnAdd.style.display = "block";
});

window.addEventListener('appinstalled', (evt) => {
    app.logEvent('a2hs', 'installed');
});


self.addEventListener('push', event => {
    const title = "Yay a message.";
    const body = "We have received a push message.";
    //const icon = "";
    const tag = "simple-push-tag";
    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            tag: tag
        })
    );
});