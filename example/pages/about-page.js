const template = document.createElement('template')
template.innerHTML = `
    <div class="container">
        <h1>About</h1>
        <p>Demo of <a href="https://github.com/nicolasparada/js-router" target="_blank" rel="noopener">@nicolasparada/router</a>.</p>
    </div>
`

export default function aboutPage() {
    return template.content.cloneNode(true)
}
