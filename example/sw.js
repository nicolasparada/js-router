const VERSION = 1
const staticCacheName = `static-v${VERSION}`
const staticUrlsToCache = [
    'https://unpkg.com/@nicolasparada/router@0.1.1/router.js',
    '/pages/about-page.js',
    '/pages/home-page.js',
    '/pages/not-found-page.js',
    '/pages/user-page.js',
    '/pages/welcome-page.js',
    '/auth.js',
    '/dynamic-import.js',
    '/header.js',
    '/index.html',
    '/main.js',
    '/router.js',
    '/styles.css',
    '/utils.js',
]

const cacheWhitelist = [
    staticCacheName,
]

self.addEventListener('install', ev => {
    ev.waitUntil(
        caches.open(staticCacheName).then(cache => cache.addAll(staticUrlsToCache))
    )
})

self.addEventListener('activate', ev => {
    ev.waitUntil(
        caches.keys().then(cacheNames => Promise.all(cacheNames
            .filter(cacheName => !cacheWhitelist.includes(cacheName))
            .map(cacheName => caches.delete(cacheName))
        ))
    )
})

self.addEventListener('fetch', ev => {
    ev.respondWith(
        caches.match(ev.request).then(res => res || ev.request.mode === 'navigate'
            ? caches.match('/index.html').then(res => res || fetch(ev.request))
            : fetch(ev.request))
    )
})
