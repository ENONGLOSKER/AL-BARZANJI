// const CACHE_NAME = 'offline-cache-v1';
// const urlsToCache = [
//     '/',
//     '/index.html',
//     '/details.html',
//     '/tentang.html',
//     '/script.js',
//     '/img/bg-head.svg',
//     '/img/bg.svg',
//     '/img/bismi.png',
//     '/img/icon-menu.png',
//     '/img/icon-min.png',
//     '/img/icon-panah.svg',
//     '/img/icon-pause.png',
//     '/img/icon-play.png',
//     '/img/icon-plus.png',
//     '/img/iconsayat.png',
//     '/img/logobz.png',
// ];

// // Install Service Worker
// self.addEventListener('install', (event) => {
//     event.waitUntil(
//         caches.open(CACHE_NAME).then((cache) => {
//             console.log('Opened cache');
//             return cache.addAll(urlsToCache);
//         })
//     );
// });

// // Fetch request
// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request).then((response) => {
//             return response || fetch(event.request);
//         })
//     );
// });

// // Activate Service Worker
// self.addEventListener('activate', (event) => {
//     const cacheWhitelist = [CACHE_NAME];
//     event.waitUntil(
//         caches.keys().then((cacheNames) =>
//             Promise.all(
//                 cacheNames.map((cacheName) => {
//                     if (!cacheWhitelist.includes(cacheName)) {
//                         return caches.delete(cacheName);
//                     }
//                 })
//             )
//         )
//     );
// });

const CACHE_NAME = 'offline-cache-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/details.html',
    '/tentang.html',
    '/script.js',
    '/img/bg-head.svg',
    '/img/bg.svg',
    '/img/bismi.png',
    '/img/icon-menu.png',
    '/img/icon-min.png',
    '/img/icon-panah.svg',
    '/img/icon-pause.png',
    '/img/icon-play.png',
    '/img/icon-plus.png',
    '/img/iconsayat.png',
    '/img/logobz.png',
];

async function preChache() {
    const cache = await caches.open(CACHE_NAME);
    return cache.addAll(STATIC_ASSETS);
}

self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
    event.waitUntil(preChache());
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
});

async function fetchAsset(event) {
    try {
        const response = await fetch(event.request)
        return response;
    } catch (error) {
        const cache = await caches.open(CACHE_NAME);
        return cache.match(event.request);
    }

}

self.addEventListener('fetch', (event) => {
    console.log('service worker Fetched');
    event.respondWith(fetchAsset(event));
});