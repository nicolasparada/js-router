export default class Router {
    constructor() {
        this.staticRoutes = /** @type {StaticRoute[]} */ ([])
        this.dynamicRoutes = /** @type {DynamicRoute[]} */ ([])
        this.callbacks = /** @type {function[]} */ ([])
        this.installed = false
    }

    /**
     * @param {string|RegExp} pattern
     * @param {StaticHandler|DynamicHandler} handler
     */
    handle(pattern, handler) {
        if (typeof pattern === 'string') {
            // @ts-ignore
            this.staticRoutes.push({ pattern, handler })
        } else if (pattern instanceof RegExp) {
            this.dynamicRoutes.push({ pattern, handler })
        }
    }

    /**
     * @param {string} pathname
     */
    exec(pathname) {
        for (const route of this.staticRoutes) {
            if (route.pattern === pathname) {
                return route.handler()
            }
        }
        for (const route of this.dynamicRoutes) {
            const match = route.pattern.exec(pathname)
            if (match !== null) {
                const params = match.slice(1).map(decodeURIComponent)
                return route.handler(...params)
            }
        }
    }

    /**
     * @param {function} callback
     */
    install(callback) {
        callback(this.exec(location.pathname))
        this.callbacks.push(callback)

        if (this.installed) {
            return
        }

        const execCallbacks = () => {
            const result = this.exec(location.pathname)
            for (const callback of this.callbacks) {
                callback(result)
            }
        }

        document.body.addEventListener('click', ev => {
            if (ev.defaultPrevented
                || ev.button !== 0
                || ev.ctrlKey
                || ev.shiftKey
                || ev.altKey
                || ev.metaKey) {
                return
            }

            const a = /** @type {Element} */ (ev.target).closest('a')
            if (a === null
                || (a.target !== '' && a.target !== '_self')
                || a.hostname !== location.hostname) {
                return
            }

            ev.preventDefault()
            ev.stopPropagation()
            if (a.href === location.href) {
                return
            }

            history.pushState(history.state, document.title, a.href)
            execCallbacks()
        })

        addEventListener('popstate', execCallbacks)

        this.installed = true
    }
}

/**
 * @typedef StaticRoute
 * @property {string} pattern
 * @property {StaticHandler} handler
 */

/**
 * @typedef DynamicRoute
 * @property {RegExp} pattern
 * @property {DynamicHandler} handler
 */

/**
 * @typedef {function(): any} StaticHandler
 */

/**
 * @typedef {function(...string): any} DynamicHandler
 */
