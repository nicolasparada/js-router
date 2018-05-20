# JavaScript Router

 - Lightweight (823 bytes).
 - Framework agnostic.

The package is shipped like an ES module. Load it with `<script type=module>`.

## Example

```js
import Router from 'https://unpkg.com/@nicolasparada/router'

const main = document.querySelector('main')
const router = new Router()

router.handle('/', homePage)
router.handle(/^\/users\/([^\/]+)$/, userPage)
router.handle(/^\//, notFound)
router.install(render)

function homePage() {
    return 'Home Page'
}

function userPage(username) {
    return `${username}'s Profile Page`
}

function notFoundPage() {
    return '404 Not Found'
}

function render(result) {
    main.innerHTML = result
}
```

Check for a more real-ish example at the `/example` dir.

### Handle

```js
router.handle('/pathname', (...params) => {
    // ...
})
```

`handle` takes a pattern and a handler function.
The pattern can be a `string` for exact match or a regular expression for dynamic URLs. `params` are the captured parts if a regular expression was used.
Be careful with the order in which you add the routes.

### Install

```js
router.install(result => {
    // ...
})
```

This callback is fired initially and for every link click or popstate event.
`result` is what the route handler returns.
