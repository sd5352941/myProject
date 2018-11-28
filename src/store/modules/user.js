import {register,login} from "@/api/user";

var user = {
  state: {},
  actions: {
    Login({commit}, data) {
      return new Promise((resolve, reject) => {
        login(data).then(res => {
          resolve(res)
        })
      })
    },
    Register({commit}, data) {
      return new Promise((resolve, reject) => {
        register(data).then(res => {
          resolve(res)
        })
      })
    }
  },
}

export default user
