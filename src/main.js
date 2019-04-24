// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import infiniteScroll from 'vue-infinite-scroll'
import store from './store'
import iview from 'iview';

import '@/permission.js' //验权

import 'iview/dist/styles/iview.css'
// import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss' //全局CSS
import '@/styles/loadingIcon.scss' //加载图标
// import VueQuillEditor from 'vue-quill-editor' //富文本编辑器
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
// Vue.use(VueQuillEditor, /* { default global options } */)

Vue.use(iview)
Vue.use(ElementUI);
Vue.use(infiniteScroll)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
