import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/view/layout'

Vue.use(Router)

export default new Router({
  hashbang: false,
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: layout,
      children: [{
        path: 'home',
        name: 'home',
        component: () => import('@/view/home')
      },{
        path: 'activityDetail',
        name: 'activityDetail',
        component: () => import('@/view/activity/detail')
      }]
    },
    {
      path: '/login',
      name: 'home',
      component: ()=> import('@/view/user/login')
    },
    {
      path: '/system',
      name: 'system',
      component: ()=> import('@/view/manageSystem/home/home'),
    }
  ]
})
