import { getAuthUser } from '../auth.js'
import { escapeHTML } from '../utils.js'

export default function renderHomePage() {
    const authUser = getAuthUser()
    const page = document.createElement('div')
    page.className = 'container'
    page.innerHTML = `
        <h1>Welcome back, ${escapeHTML(authUser.username)} 👋</h1>
    `
    return page
}
