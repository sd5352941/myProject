import Vuex from "vuex"
import Vue from "vue"
import activity from "./modules/activity"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    activity
  },
  getters:{}
})

export default store
