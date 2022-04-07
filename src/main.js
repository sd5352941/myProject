// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import infiniteScroll from 'vue-infinite-scroll'
import store from './store'
import iview from 'iview';
import 'flex.css';
import fullpage from "v-fullpage";



import '@/permission.js' //验权

import 'iview/dist/styles/iview.css'
// import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss' //全局CSS
import '@/styles/loadingIcon.scss' //加载图标
import viewMap from '@/components/viewMap/index'
import xhqRadio from '@/components/xhqRadio/index'
import uploadImg from '@/components/UploadImg/index'
import hdLabel from '@/components/hdLabel/index'
import portrait from '@/components/userPortrait/index'
var COS = require('cos-js-sdk-v5');
const cos = new COS({
  SecretId: 'AKIDue8MM5XiiRt4ybx2rPgfNt86pIUQ4SZO',
  SecretKey: 'Zsuf9MJ2UfbHgofFYaKn0waz7yXqcDbi',
});


import Tinymce from 'tinymce'
Vue.prototype.$tinymce = Tinymce;
window['cos'] = cos



Vue.component('view-map',viewMap)
Vue.component('upload-img',uploadImg)
Vue.component('xhq-radio',xhqRadio)
Vue.component('hd-label',hdLabel)
Vue.component('portrait',portrait)

Vue.use(iview)
Vue.use(ElementUI);
Vue.use(infiniteScroll)
Vue.use(fullpage);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
