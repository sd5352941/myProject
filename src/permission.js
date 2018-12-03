import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import router from './router'

router.beforeEach((to, from, next)=>{
  NProgress.start()
  if(to.path==='/') {
    next('/home')
  } else {
    next()
  }
})


router.afterEach(() => {
  NProgress.done() // 结束Progress
})

