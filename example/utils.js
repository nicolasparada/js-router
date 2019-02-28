import { importWithCache } from './dynamic-import.js'

export function escapeHTML(unsafe) {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
}

export function view(name) {
    return (...args) => importWithCache(`/components/${name}.js`)
        .then(m => m.default(...args))
}

/**
 * @param {Element} target
 */
export async function render(result, target) {
    target.innerHTML = ''
    if (result instanceof Promise) {
        result = await result
    }
    if (typeof result === 'string') {
        target.innerHTML = result
    } else if (result instanceof Node) {
        target.appendChild(result)
    } else {
        throw new Error('view cannot be rendered')
    }
}

/**
 * @param {Element=} target
 */
export function updateAriaCurrentPage(target = document.body) {
    for (const a of target.querySelectorAll('a')) {
        if (a.pathname === location.pathname) {
            a.setAttribute('aria-current', 'page')
        } else {
            a.removeAttribute('aria-current')
        }
    }
}
