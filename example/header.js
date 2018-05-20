import { getAuthUser } from './auth.js';
import { escapeHTML } from './utils.js';

const authUser = getAuthUser()

if (authUser !== null) {
    document.querySelector('header').innerHTML += `
        <a href="/users/${escapeHTML(authUser.username)}">Profile</a>
        <button onclick="logout()">Logout</button>
    `
}

window.logout = function logout() {
    localStorage.removeItem('auth_user')
    location.assign('/')
}
