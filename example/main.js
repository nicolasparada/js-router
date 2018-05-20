import Router from 'https://unpkg.com/@nicolasparada/router';
import { getAuthUser } from './auth.js';

const main = document.querySelector('main')
const modulesCache = new Map()
const router = new Router()

router.handle('/', guard(view('home')))
router.handle(/^\/users\/([^\/]+)$/, view('user'))
router.handle(/^\//, view('not-found'))

router.install(async resultPromise => {
    fixHeaderLinks()
    main.innerHTML = ''
    main.appendChild(await resultPromise)
})

function view(name) {
    return (...args) => importWithCache(`/pages/${name}-page.js`)
        .then(m => m.default(...args))
}

async function importWithCache(specifier) {
    if (modulesCache.has(specifier)) {
        return modulesCache.get(specifier)
    }
    const m = await import(specifier)
    modulesCache.set(specifier, m)
    return m
}

function guard(fn1, fn2 = view('welcome')) {
    return (...args) => getAuthUser() !== null
        ? fn1(...args)
        : fn2(...args)
}

function fixHeaderLinks() {
    for (const a of /** @type {HTMLAnchorElement[]} */ (Array.from(document.querySelectorAll('header a')))) {
        a.classList[a.href === location.href ? 'add' : 'remove']('active')
    }
}
