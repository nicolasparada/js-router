import { getAuthUser } from './auth.js';

const authUser = getAuthUser()
const nav = document.querySelector('header nav')

if (authUser !== null) {
    nav.innerHTML += `
        <a href="/users/${encodeURIComponent(authUser.username)}">Profile</a>
        <button onclick="logout()">Logout</button>
    `
}

addEventListener('routernavigation', onRouterNavigation)

function logout() {
    localStorage.removeItem('auth_user')
    location.assign('/')
}

function onRouterNavigation() {
    const links = Array.from(nav.querySelectorAll('a'))
    for (const link of links) {
        if (link.pathname === location.pathname) {
            link.setAttribute('aria-current', 'page')
        } else {
            link.removeAttribute('aria-current')
        }
    }
}

window['logout'] = logout
