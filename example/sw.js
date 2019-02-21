const VERSION = 4
const staticCacheName = `static-v${VERSION}`
const staticUrlsToCache = [
    'https://unpkg.com/@nicolasparada/router@0.7.0/router.js',
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
        caches.match(ev.request).then(res => res || fetch(ev.request).catch(err => {
            if (ev.request.mode === 'navigate') {
                return caches.match('/index.html')
            }
            throw err
        }))
    )
})
