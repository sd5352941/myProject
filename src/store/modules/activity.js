import {getActivity, getActivityDetail, addActivity,signUpActivity,getMyActivities,deleteActivity} from "@/api/activity";
import {getUserPortrait} from "../../utils/auth";
import {getUserName} from "@/utils/auth";

const activity = {
  state: {
    /**
     * 全局搜索信息
     */
    searchValue: {
      type: 'all', //活动性质
      state: ['ongoing','expire','full'], //活动状态
    },
    searchDesc: [
      // {label: '活动性质', //名称
      //   status: 'radio', //组件类别
      //   model: 'type', //对应v-model
      //   value: [{
      //     label: '不限',
      //     value: 'all'
      //   }, {
      //     label: '免费',
      //     value: 'free'
      //   }, {
      //     label: '收费',
      //     value: 'charge'
      //   }]
      // },
      {
        label: '活动状态',
        status: 'checkbox',
        model: 'state',
        value: [ {
          label: '已过期',
          value: 'expire'
        }, {
          label: '报名已满',
          value: 'full'
        }]
      }
    ],


    commitDetail: {  //发布活动信息
      signUpUser: [], //报名用户
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
      createTime: '',
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
      state: '',
      address: '',
      title: '',
      pageNum: 0,
      pageSize: 6
    },
    loadingDisplay: false,
    noData: false
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
          createTime: '',
      }
    },
    SET_LIST(state, list) {
      state.activityList.push(...list)
    },
    CLEAR_HD_LIST(state) {
      // state.noData = false
      // state.loadingDisplay = false
      state.queryParams.pageNum = 0
      state.queryParams.pageSize = 6
      state.activityList = []
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
    DeleteActivity({commit},params) {
      return new Promise((resolve,reject)=> {
        deleteActivity(params).then(res=> {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    GetMyActivities() { //获取自己发布活动
      return new Promise((resolve,reject)=> {
        getMyActivities().then(res=> {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    GetActivityList({state,commit}, params) {  //获取活动列表
      return new Promise((resolve, reject) => {
        let query = {
          ...params,
          ...state.queryParams
        }
        getActivity(query).then(res => {
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
        state.commitDetail.createTime = new Date()
        state.commitDetail['creatorPortrait'] = getUserPortrait()
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
    commitDetail: state => state.commitDetail,
    searchDesc: state => state.searchDesc,
    searchValue:state => state.searchValue,
  }
}

export default activity
