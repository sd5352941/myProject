import {getActivity, getActivityDetail} from "@/api/activity";

const activity = {
  state: {
    commitDetail: {  //发布活动信息
      title: '',
      time: '', //骑行日期
      gatheringTime: '', //集合时间
      departureTime: '', //开始时间
      type: 'free',
      tags: [],
      desc: '',
      people: 0,
      pee: '',
      mapPoint: [], //骑行路径点
    },

    activityList: [], // 活动列表
    activityDetail: {}, // 活动详情
    activityDesc: {  //活动描述
      date1: '集合时间',
      date2: '出发时间',
      desc: '活动描述',
      type: '活动标签'
    },
    queryParams: {
      pageNum: 0,
      pageSize: 6
    }
  },
  mutations: {
    SET_LIST(state, list) {
      state.activityList.push(...list)
    },
    SET_DETAIL(state, detail) {
      state.activityDetail = detail[0]
    },
  },
  actions: {
    GetActivityList({commit}, parmas) {  //获取活动列表
      return new Promise((resolve, reject) => {
        getActivity(parmas).then(res => {
          commit('SET_LIST', res.data.result)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    GetActivityDetail({commit}, params) {  //获取活动详情
      return new Promise((resolve, reject) => {
        getActivityDetail(params).then(res => {
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
    activityDesc: state => state.activityDesc,
    activityParmas: state => state.queryParams,
    commitDetail: state => state.commitDetail
  }
}

export default activity
