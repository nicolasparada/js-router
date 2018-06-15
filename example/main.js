import Router from 'https://unpkg.com/@nicolasparada/router@0.5.0/router.js';
import { getAuthUser } from './auth.js';
import { importWithCache } from './dynamic-import.js';

const routerNavigationEvent = new CustomEvent('routernavigation')
const main = document.querySelector('main')
const router = new Router()

router.handle('/', guard(view('home')))
router.handle('/about', view('about'))
router.handle(/^\/users\/([^\/]+)$/, view('user'))
router.handle(/^\//, view('not-found'))

router.install(async resultPromise => {
    dispatchEvent(routerNavigationEvent)
    main.innerHTML = ''
    main.appendChild(await resultPromise)
})

function view(name) {
    return (...args) => importWithCache(`/pages/${name}-page.js`)
        .then(m => m.default(...args))
}

function guard(fn1, fn2 = view('welcome')) {
    return (...args) => getAuthUser() !== null
        ? fn1(...args)
        : fn2(...args)
}
