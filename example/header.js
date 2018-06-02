import { getAuthUser } from './auth.js';

const authUser = getAuthUser()
const nav = document.querySelector('header nav')

if (authUser !== null) {
    nav.innerHTML += `
        <a href="/users/${encodeURIComponent(authUser.username)}">Profile</a>
        <button onclick="logout()">Logout</button>
    `
}

addEventListener('navigation', fixNavLinks)

window.logout = function logout() {
    localStorage.removeItem('auth_user')
    location.assign('/')
}

function fixNavLinks() {
    const links = Array.from(nav.querySelectorAll('a'))
    for (const link of links) {
        if (link.href === location.href) {
            link.setAttribute('aria-current', 'page')
        } else {
            link.removeAttribute('aria-current')
        }
    }
}
