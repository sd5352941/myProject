import {getActivity, getActivityDetail, addActivity,signUpActivity} from "@/api/activity";
import {getUserName} from "@/utils/auth";

const activity = {
  state: {
    commitDetail: {  //发布活动信息
      roadKm: [], //骑行总里程 unit:km
      address: '', //活动集合地点
      destination: '', //目的地
      img: '', //活动封面图片url
      imgPath: {}, //活动封面后台地址
      title: '', //活动标题
      time: '', //骑行日期
      gatheringTime: '', //集合时间
      departureTime: '', //出发时间
      typeArr: [{label: 0,value: '免费',type: 'free'}], //报名种类
      tags: [],  //活动标签
      desc: '', //活动详情
      people: 0, //人数限制
      creator: '', //提交用户名
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
    CLEAR_COMMITDETAIL(state) {
      state.commitDetail = {  //发布活动信息
          roadKm: [],
          address: '', //活动集合地点
          destination: '', //目的地
          img: '', //活动封面图片url
          imgPath: {}, //活动封面后台地址
          title: '', //活动标题
          time: '', //骑行日期
          gatheringTime: '', //集合时间
          departureTime: '', //出发时间
          typeArr: [{label: 0,value: '免费',type: 'free'}], //报名种类
          tags: [],  //活动标签
          desc: '', //活动详情
          people: 0, //人数限制
          creator: '', //提交用户名
          pee: '',
          mapPoint: [], //骑行路径点
      }
    },
    SET_LIST(state, list) {
      state.activityList.push(...list)
    },
    SET_DETAIL(state, detail) {
      state.activityDetail = detail
    },
    SET_COMMITDETAIL(state,detail) {
      state.commitDetail = detail
    },
    SET_COMMITDETAILCREATOR(state) {
      state.commitDetail.creator = getUserName()
    }
  },
  actions: {
    GetActivityList({commit}, parmas) {  //获取活动列表
      return new Promise((resolve, reject) => {
        getActivity(parmas).then(res => {
          const result = res.data.result
          commit('SET_LIST', result)
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
    AddActivity({state}) {  //添加活动列表
      return new Promise((resolve, reject)=> {
        addActivity(state.commitDetail).then(res => {
          resolve(res)
        }).catch(err=> {
          reject(err)
        })
      })
    },
  },
  getters: {
    activityList: state => state.activityList,
    activityDetail: state => state.activityDetail,
    activityDesc: state => state.activityDesc,
    activityParams: state => state.queryParams,
    commitDetail: state => state.commitDetail
  }
}

export default activity
