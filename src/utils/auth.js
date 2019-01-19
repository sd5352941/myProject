import Cookies from 'js-cookie'


export function setUserName(name) {
  Cookies.set('username',name)
}

export function setToken(token) {
 Cookies.set('userToken',token)
}

export function removeToken() {
  Cookies.remove('userToken')
}

export function removeUserName() {
  Cookies.remove('username')
}

export function getToken() {
  return Cookies.get('userToken')
}

export function getUserName() {
  return Cookies.get('username')
}
