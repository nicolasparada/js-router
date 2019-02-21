import { createRouter } from 'https://unpkg.com/@nicolasparada/router@0.7.0/router.js';
import { getAuthUser } from './auth.js';
import { importWithCache } from './dynamic-import.js';

const main = document.querySelector('main')
const r = createRouter()

r.route('/', guard(view('home')))
r.route('/about', view('about'))
r.route(/^\/users\/(?<username>[^\/]+)$/, view('user'))
r.route(/^\//, view('not-found'))

r.subscribe(async resultPromise => {
    main.innerHTML = ''
    main.appendChild(await resultPromise)
})

r.install()

export { r as router }

function view(name) {
    return (...args) => importWithCache(`/pages/${name}-page.js`)
        .then(m => m.default(...args))
}

function guard(fn1, fn2 = view('access')) {
    return (...args) => getAuthUser() !== null
        ? fn1(...args)
        : fn2(...args)
}
