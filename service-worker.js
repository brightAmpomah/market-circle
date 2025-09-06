const CACHE_NAME = "market-circle-v1";
const FILES_TO_CACHE = [
    "/",
    "index.html",
    "style.css",
    "script.js",
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => response || fetch(event.request).catch(() => {
            if (event.request.destination === "document") {
                return caches.match("index.html");
            }
        }))
    );
});