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
