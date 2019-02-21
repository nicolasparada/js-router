import { getAuthUser } from './auth.js';
import { router } from './main.js'

const authUser = getAuthUser()
const nav = document.querySelector('header nav')

if (authUser !== null) {
    nav.innerHTML += `
        <a href="/users/${encodeURIComponent(authUser.username)}">Profile</a>
        <button id="logout-button">Logout</button>
    `
    nav.querySelector('#logout-button').addEventListener('click', logout)
}

router.subscribe(() => {
    const links = Array.from(nav.querySelectorAll('a'))
    for (const link of links) {
        if (link.pathname === location.pathname) {
            link.setAttribute('aria-current', 'page')
        } else {
            link.removeAttribute('aria-current')
        }
    }
})

function logout() {
    localStorage.removeItem('auth_user')
    location.assign('/')
}

window['logout'] = logout
