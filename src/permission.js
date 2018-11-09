import NProgress from 'nprogress' // Progress 进度条
import router from './router'

router.beforeEach((to, from, next)=>{
  if(to.path==='/') {
    next('/home')
  } else {
    next()
  }
})
