if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('/static/js/serviceWorker.js')
    .then((reg) => console.log('service worker registered', reg))
    .catch((err) => console.log('service worker not registered', err))
}