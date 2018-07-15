/**
 * @typedef {function(): any} StaticHandler
 */

/**
 * @typedef {function(...string): any} DynamicHandler
 */

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


const _exec = Symbol('_exec')
let hijacked = false

export class Router {
    constructor() {
        this.staticRoutes = /** @type {StaticRoute[]} */ ([])
        this.dynamicRoutes = /** @type {DynamicRoute[]} */ ([])
        this.callbacks = /** @type {function[]} */ ([])
        this.installed = false

        this.handle = this.handle.bind(this)
        this[_exec] = this[_exec].bind(this)
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
     * @param {function=} callback
     */
    install(callback) {
        if (typeof callback === 'function') {
            callback(this[_exec](location.pathname))
            this.callbacks.push(callback)
        }

        if (this.installed) {
            return
        }

        const execCallbacks = () => {
            const result = this[_exec](location.pathname)
            for (const callback of this.callbacks) {
                callback(result)
            }
        }

        addEventListener('popstate', execCallbacks)
        addEventListener('pushstate', execCallbacks)
        hijackClicks()

        this.installed = true
    }

    /**
     * @param {string} pathname
     */
    [_exec](pathname) {
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
}

export default Router

function hijackClicks() {
    if (hijacked) {
        return
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
        if (a.href === location.href) {
            return
        }

        navigate(a.href)
    })

    hijacked = true
}

/**
 * @param {string} to
 * @param {boolean=} replace
 */
export function navigate(to, replace = false) {
    if (replace) {
        history.replaceState(history.state, document.title, to)
    } else {
        history.pushState(history.state, document.title, to)
    }
    dispatchEvent(new PopStateEvent('pushstate', { state: history.state }))
}
