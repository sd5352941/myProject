import Cookies from 'js-cookie'


export function setUserName(name) {
  Cookies.set('username',name)
}

export function setToken(token) {
 Cookies.set('userToken',token)
}

export function removeToken() {
  Cookies.remove('token')
}

export function removeUserName() {
  Cookies.remove('username')
}

export function getToken() {
  Cookies.get('token')
}

export function getUserName() {
  Cookies.get('username')
}
