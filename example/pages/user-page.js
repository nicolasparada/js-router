export default function userPage(username) {
    const template = document.createElement('template')
    template.innerHTML = `
        <div class="container">
            <h1>${username}'s Profile Page</h1>
        </div>
    `
    return template.content
}
