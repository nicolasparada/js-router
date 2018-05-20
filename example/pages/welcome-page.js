const template = document.createElement('template')
template.innerHTML = `
    <div class="container">
        <h1>Login</h1>
        <form>
            <input type="text" placeholder="Username" autocomplete="username" autofocus required>
            <button type="submit">Login</button>
        </form>
    </div>
`
export default function welcomePage() {
    const page = /** @type {DocumentFragment} */ (template.content.cloneNode(true))
    page.querySelector('form').addEventListener('submit', login)
    return page
}

function login(ev) {
    ev.preventDefault()
    const form = ev.currentTarget
    const input = form.querySelector('input')
    const user = { username: input.value }
    localStorage.setItem('auth_user', JSON.stringify(user))
    location.replace('/')
}
