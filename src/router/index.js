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
        path: 'test',
        name: 'test',
        component: () => import('@/view/test')
      }]
    }
  ]
})
