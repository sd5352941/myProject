import {getActivity} from "@/api/activity";

const activity = {
  state: {
    activityList: [],// 活动列表
    activityDetail: {}, // 活动详情
    activityDesc: { //活动描述
      date1: '集合时间',
      date2: '出发时间',
      desc: '活动描述',
      type: '活动标签'
    }
  },
  mutations: {
    SET_LIST(state, list) {
      state.activityList = list
    },
    SET_DETAIL(state, detail) {
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
    activityDetail: state => state.activityDetail,
    activityDesc: state => state.activityDesc
  }
}

export default activity
