// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import iView from 'iview';
import infiniteScroll from 'vue-infinite-scroll'

import '@/permission.js' //验权

import 'element-ui/lib/theme-chalk/index.css';
import 'iview/dist/styles/iview.css';
import '@/styles/index.scss' //全局CSS
import '@/styles/loadingIcon.scss' //加载图标




Vue.use(ElementUI);
Vue.use(iView);
Vue.use(infiniteScroll)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
