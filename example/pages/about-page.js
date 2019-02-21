const page = document.createElement('div')
page.className = 'container'
page.innerHTML = `
    <h1>About</h1>
    <p>Demo of <a href="https://github.com/nicolasparada/js-router" target="_blank" rel="noopener">@nicolasparada/router</a>.</p>
`

export default function aboutPage() {
    return page
}
