import { getAuthUser } from './auth.js';

const profileLink = /** @type {HTMLAnchorElement} */ (document.getElementById('profile-link'))
const logoutButton = /** @type {HTMLButtonElement} */ (document.getElementById('logout-button'))

const authUser = getAuthUser()

if (authUser !== null) {
    profileLink.href = '/users/' + authUser.username
    profileLink.hidden = false

    logoutButton.onclick = logout
    logoutButton.hidden = false
}

function logout() {
    localStorage.removeItem('auth_user')
    location.assign('/')
}
