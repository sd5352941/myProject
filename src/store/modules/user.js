import {register, login} from "@/api/user";
import {setToken, setUserName, removeToken,
  removeUserName, getToken, getUserName} from "../../utils/auth";

var user = {
  state: {
    userName: getUserName(),
    token: getToken()
  },
  actions: {
    Login({commit}, data) {
      return new Promise((resolve, reject) => {
        login(data).then(res => {
          setToken(res.data.token)
          setUserName(res.data.name)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    LoginOut({commit}) {
      removeUserName()
      removeToken()
    },
    Register({commit}, data) {
      return new Promise((resolve, reject) => {
        register(data).then(res => {
          resolve(res)
        })
      })
    }
  },
  getters: {
    token: state => state.token,
    userName: state => state.userName()
  }
}

export default user
