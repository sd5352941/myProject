import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/view/layout'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
