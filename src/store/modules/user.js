import {register, login, getUserActivities,getUserData,commitUserData} from "@/api/user";
import {setToken, setUserName, removeToken,
  removeUserName, getToken, getUserName} from "../../utils/auth";

var user = {
  state: {
    userName: getUserName(),
    token: getToken()
  },
  mutations: {
    SET_USERNAME(state,name) {
      state.userName = name
    },
    SET_USERTOKEN(state,token) {
      state.token = token
    }
  },
  actions: {
    CommitUserData({commit},data) {
      return new Promise((resolve, reject) => {
        commitUserData(data).then(res => {
          resolve(res)
        })
      })
    },
    GetUserData({commit}, data) {
      return new Promise((resolve, reject) => {
        getUserData(data).then(res => {
          resolve(res)
        })
      })
    },
    Login({commit}, data) {
      return new Promise((resolve, reject) => {
        login(data).then(res => {
          setToken(res.data.token)
          setUserName(res.data.name)
          commit('SET_USERNAME',res.data.name)
          commit('SET_USERTOKEN',res.data.token)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    LoginOut({commit}) {
      removeUserName()
      removeToken()
      commit('SET_USERNAME','')
      commit('SET_USERTOKEN','')
    },
    Register({commit}, data) {
      return new Promise((resolve, reject) => {
        register(data).then(res => {
          resolve(res)
        })
      })
    },
    /**
     * 获取当前用户活动列表
     * @param commit
     * @returns {Promise<unknown>}
     * @constructor
     */
    GetUserActivities({commit}) {
      return new Promise((resolve,reject)=> {
        getUserActivities().then(res=> {
          resolve(res)
        })
      })
    }
  },
  getters: {
    token: state => state.token,
    userName: state => state.userName
  }
}

export default user
