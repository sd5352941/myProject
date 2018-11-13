import {getActivity} from "@/api/activity";

const activity = {
  state: {
    activityList: [],
    activityDetail: {}
  },
  mutations: {
    SET_LIST(state, list) {
      state.activityList = list
    },
    SET_DETAIL(state,detail) {
      state.activityDetail = detail[0]
    },
  },
  actions: {
    GetActivityList({commit}, parmas) {
      return new Promise((resolve, reject) => {
        getActivity(parmas).then(res => {
          commit('SET_LIST', res.data.result)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    GetActivityDetail({commit}, params) {
      return new Promise((resolve, reject) => {
        getActivity(params).then(res => {
          commit('SET_DETAIL', res.data.result)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
  },
  getters: {
    activityList: state => state.activityList,
    activityDetail: state => state.activityDetail
  }
}

export default activity
