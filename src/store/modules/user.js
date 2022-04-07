import {register, login, getUserActivities,getUserData,commitUserData,commitHomePage,concernUser,getUsers} from "@/api/user";
import {
  setToken, setUserName, setUserPortrait, removeToken, removePortrait,
  removeUserName, getToken, getUserName, getUserPortrait, setUserId,
  getUserId,removeUserId
} from "../../utils/auth";

var user = {
  state: {
    userName: getUserName(),
    token: getToken(),
    portrait: getUserPortrait()
  },
  mutations: {
    SET_USERNAME(state,name) {
      state.userName = name
      setUserName(name)
    },
    SET_USERTOKEN(state,token) {
      state.token = token
    },
    LOGIN(state,data) {

    }
  },
  actions: {
    GetUsers({},data) {
      return new Promise((resolve, reject) => {
        getUsers(data).then(res => {
          resolve(res)
        })
      })
    },
    GetUserId() {
      return new Promise((resolve, reject) => {
          resolve(getUserId())
      })
    },
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
    ConcernUser({},data) {
      return new Promise((resolve, reject) => {
        concernUser(data).then(res => {
          resolve(res)
        })
      })
    },
    Login({commit}, data) {
      return new Promise((resolve, reject) => {
        login(data).then(res => {
          setToken(res.data.token)
          setUserName(res.data.name)
          setUserPortrait(res.data.portrait)
          setUserId(res.data.userId)
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
      removePortrait()
      removeUserId()
      commit('SET_USERNAME','')
      commit('SET_USERTOKEN','')
    },
    Register({commit}, data) {
      return new Promise((resolve, reject) => {
        register(data).then(res => {
          setToken(res.data.token)
          setUserPortrait(res.data.portrait)
          setUserId(res.data.userId)
          commit('SET_USERNAME',res.data.name)
          commit('SET_USERTOKEN',res.data.token)
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
    },

    /**
     * 提交个人主页数据
     * @param data
     * @constructor
     */
    CommitHomePage ({},data) {
      return new Promise((resolve,reject)=> {
        commitHomePage(data).then(res=> {
          resolve(res)
        })
      })
    }
  },
  getters: {
    token: state => state.token,
    userName: state => state.userName,
    portrait: state => state.portrait
  }
}

export default user
