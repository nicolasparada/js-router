const template = document.createElement('template')
template.innerHTML = `
    <div class="container">
        <h1>Home Page</h1>
    </div>
`

export default function homePage() {
    return template.content.cloneNode(true)
}
