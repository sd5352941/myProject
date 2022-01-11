import Cookies from 'js-cookie'


export function setUserName(name) {
  // Cookies.set('username',name)
  localStorage.setItem("username", name);
}

export function setToken(token) {
  localStorage.setItem("userToken", token);

  // Cookies.set('userToken',token)
}

export function removeToken() {
  localStorage.removeItem("userToken");
  // Cookies.remove('userToken')
}

export function removePortrait() {
  localStorage.removeItem("userPortrait");
  // Cookies.remove('userToken')
}

export function removeUserName() {
  localStorage.removeItem("username");
}

export function getToken() {
  return localStorage.getItem("userToken");
  // return Cookies.get('userToken')
}

export function getUserName() {
  return localStorage.getItem("username");
  //
  // return Cookies.get('username')
}

export function getUserPortrait() {
  return localStorage.getItem("userPortrait");
  //
  // return Cookies.get('username')
}


export function setUserPortrait(userPortrait) {
  return localStorage.setItem("userPortrait", userPortrait);
  //
  // return Cookies.get('username')
}
