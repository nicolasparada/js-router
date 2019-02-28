import { guard } from './auth.js'
import { createRouter } from 'https://unpkg.com/@nicolasparada/router@0.7.1/router.js'
import { render, updateAriaCurrentPage, view } from './utils.js'

const nav = document.querySelector('header nav')
const main = document.querySelector('main')
const r = createRouter()

r.route('/', guard(view('home-page'), view('access-page')))
r.route('/about', view('about-page'))
r.route(/^\/users\/(?<username>[^/]+)$/, view('user-page'))
r.route(/^\//, view('not-found-page'))
r.subscribe(async result => {
    await render(result, main)
    updateAriaCurrentPage(nav)
})
r.install()
