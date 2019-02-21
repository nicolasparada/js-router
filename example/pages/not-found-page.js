const page = document.createElement('div')
page.className = 'container'
page.innerHTML = `
    <h1>404 Not Found</h1>
`

export default function notFoundPage() {
    return page
}
