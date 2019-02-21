import { escapeHTML } from '../utils.js';

export default function userPage({ username }) {
    const page = document.createElement('div')
    page.className = 'container'
    page.innerHTML = `
        <h1>${escapeHTML(username)}'s Profile Page</h1>
    `
    return page
}
