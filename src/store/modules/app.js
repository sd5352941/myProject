import {getActivity, getActivityDetail} from "@/api/activity";

const app = {
  state: {
    navMenu: [
      {label: '首页',target: '/'},
      {label: '测试', target: 'system'}
    ]
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    navMenu: state => state.navMenu,
  }
}

export default app
