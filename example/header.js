import { getAuthUser } from './auth.js'
import { escapeHTML } from './utils.js'

const authUser = getAuthUser()
const nav = document.querySelector('header nav')

if (authUser !== null) {
    nav.innerHTML += `
        <a href="/users/${escapeHTML(authUser.username)}">Profile</a>
        <button id="logout-button">Logout</button>
    `
    nav.querySelector('#logout-button').addEventListener('click', logout)
}

function logout() {
    localStorage.removeItem('auth_user')
    location.assign('/')
}
