import {getActivityList} from "@/api/activity";

const activity = {
  state: {
    activityList: []
  },
  mutations: {
    SET_LIST (state,list) {
      state.activityList = list
    }
  },
  actions: {
    GetActivityList({commit}, parmas) {
      return new Promise((resolve, reject) => {
        getActivityList(parmas).then(res => {
          commit('SET_LIST',res.data.result)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  getters:{
    activityList:state=>state.activityList
  }
}

export default activity
