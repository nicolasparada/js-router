# JavaScript Router

 - Lightweight (1.11 kB).
 - Framework agnostic.

Shipped like an ES module. Load it with `<script type=module>`.

[Demo](https://js-router.netlify.com/)

## Example

```js
import { createRouter } from 'https://unpkg.com/@nicolasparada/router@0.7.1/router.js'

const main = document.querySelector('main')
const router = createRouter()

router.route('/', homePage)
router.route(/^\/users\/(?<username>[^/]+)$/, userPage)
router.route(/^\//, notFound)
router.subscribe(render)
router.install()

function homePage() {
    return 'Home Page'
}

function userPage(params) {
    return `${params.username}'s Profile Page`
}

function notFoundPage() {
    return '404 Not Found'
}

function render(result) {
    main.innerHTML = result
}
```

Check for a more real-ish example at the [`/example`](https://github.com/nicolasparada/js-router/tree/master/example) dir.

### Route

```js
router.route('/', params => {
    // ...
})
```

`route` takes a pattern and a handler function.

The pattern can be a `string` for exact match or a regular expression for dynamic URLs. `params` is actually an array with the captured parts if a regular expression was used. But if you used named capture groups, you can access them through the names you provided.

Be careful with the order in which you add the routes.

### Subscribe

```js
router.subscribe(result => {
    // ...
})
```

The listener you pass is fired initially and for every navigation.
`result` is what the route handler returns.

### Install

```js
router.install()
```

It makes the router start listening for navigation events (`popstate` and whatsoever). It also hijacks all the anchor links to prevent full page reloads.

### Navigate

```js
import { navigate } from 'https://unpkg.com/@nicolasparada/router@0.7.1/router.js'

navigate('/')
```

This function allows you to navigate imperatively. It accepts a second boolean argument to navigate without leaving history behind (`history.replaceState`).
