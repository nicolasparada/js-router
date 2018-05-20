import { getAuthUser } from '../auth.js';
import { escapeHTML } from '../utils.js';

export default function homePage() {
    const authUser = getAuthUser()
    const template = document.createElement('template')
    template.innerHTML = `
        <div class="container">
            <h1>Welcome back, ${escapeHTML(authUser.username)} 👋</h1>
        </div>
    `
    return template.content
}
