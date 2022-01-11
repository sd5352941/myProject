import {getActivity, getActivityDetail} from "@/api/activity";

const app = {
  state: {
    navMenu: [
      {label: '首页',target: '/'},
      {label: '个人中心', target: 'system'}
    ],

  },
  mutations: {
    TO_HD_DETAIL({state},params) {
      window.open('/#/activityDetail?_id=' + params._id)
    },
    TO_PERSONAL_DETAIL({},params) {
      window.open('/#/personal?userId=' + params.userId)
    }
  },
  actions: {
  },
  getters: {
    navMenu: state => state.navMenu,
  }
}

export default app
