export function getAuthUser() {
    const authUserItem = localStorage.getItem('auth_user')
    if (authUserItem === null) {
        return null
    }
    try {
        return JSON.parse(authUserItem)
    } catch (_) {
        return null
    }
}

export function guard(fn1, fn2) {
    return (...args) => getAuthUser() !== null
        ? fn1(...args)
        : fn2(...args)
}
