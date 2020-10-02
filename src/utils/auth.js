import Cookies from 'js-cookie'

const TokenKey = 'token'
const userIdKey = 'userId'
const themeKey = 'themeKey'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserId(userId) {
  return Cookies.set(userIdKey, userId)
}

export function getUserId() {
  return Cookies.get(userIdKey)
}

export function removeUserId() {
  return Cookies.remove(userIdKey)
}

export function setTheme(theme) {
  return Cookies.set(themeKey, theme)
}
export function getTheme() {
  return Cookies.get(themeKey) || 'light'
}

