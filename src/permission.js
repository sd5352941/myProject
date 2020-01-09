import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import {getToken} from "./utils/auth";
import router from './router'

router.beforeEach((to, from, next)=>{
  NProgress.start()
  if(to.matched[0].name == 'system') {
    getToken() ? next() : next('/login')
  } else {
    next()
  }
})


router.afterEach(() => {
  NProgress.done() // 结束Progress
})

