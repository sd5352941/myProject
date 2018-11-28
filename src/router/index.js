import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/view/layout'
import login from '@/view/user/login'

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
      }]
    },
    {
      path: '/',
      name: 'home',
      component: layout,
      children: [{
        path: 'activityDetail',
        name: 'activityDetail',
        component: () => import('@/view/activity/detail')
      }]
    },
    {
      path: '/login',
      name: 'home',
      component: login,
    }
  ]
})
