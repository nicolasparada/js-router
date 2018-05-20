import { getAuthUser } from './auth.js';

const authUser = getAuthUser()

if (authUser !== null) {
    document.querySelector('header').innerHTML += `
        <a href="/users/${encodeURIComponent(authUser.username)}">Profile</a>
        <button onclick="logout()">Logout</button>
    `
}

window.logout = function logout() {
    localStorage.removeItem('auth_user')
    location.assign('/')
}
