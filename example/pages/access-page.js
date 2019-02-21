const template = document.createElement('template')
template.innerHTML = `
    <div class="container">
        <h1>Access</h1>
        <form>
            <input type="text"
                   placeholder="Username"
                   autocomplete="username"
                   pattern="^[a-zA-Z][a-zA-Z0-9-_]{0,17}$"
                   title="Alpha numeric and dashes allowed. Between 1 and 18 chars."
                   autofocus
                   required>
            <button type="submit">Login</button>
        </form>
        <p>Not a real login. Enter any name 🙂</p>
    </div>
`
export default function accessPage() {
    const page = /** @type {DocumentFragment} */ (template.content.cloneNode(true))
    page.querySelector('form').addEventListener('submit', login)
    setTimeout(input => {
        input.focus()
    }, 0, page.querySelector('input'))
    return page
}

/**
 * @param {Event} ev
 */
function login(ev) {
    ev.preventDefault()
    const form = /** @type {HTMLFormElement} */ (ev.currentTarget)
    const input = form.querySelector('input')
    const authUser = { username: input.value }
    localStorage.setItem('auth_user', JSON.stringify(authUser))
    location.replace('/')
}
