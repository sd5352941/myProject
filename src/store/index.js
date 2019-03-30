import Vuex from "vuex"
import Vue from "vue"
import activity from "./modules/activity"
import user from "./modules/user"
import app from "./modules/app"
import home from './modules/home'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    activity,
    user,
    app,
    home
  },
  // state: {
  //   homeTab: 'list' //首页标签
  // },
  // getters: {
  //   homeTab: state => state.homeTab
  // }
})

export default store
