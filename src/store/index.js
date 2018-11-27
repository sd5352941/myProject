import Vuex from "vuex"
import Vue from "vue"
import activity from "./modules/activity"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    activity
  },
  state: {
    homeTab: 'list' //首页标签
  },
  getters: {
    homeTab: state => state.homeTab
  }
})

export default store
