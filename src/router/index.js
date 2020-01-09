import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/view/layout'
import system from '@/view/systemLayout'
import none from '@/view/systemLayout/manageSystem/none'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: 'home',
      component: layout,
      children: [{
        path: '/home',
        name: 'home',
        component: () => import('@/view/home')
      },{
        path: '/activityDetail',
        name: 'activityDetail',
        component: () => import('@/view/activity/detail')
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: ()=> import('@/view/user/login')
    },
    /**
     *  后台管理router
     **/{
      path: '/system',
      name: 'system',
      redirect: 'systemHome',
      component: system,
      children: [{
        path: '/systemHome',
        name: 'systemHome',
        meta: { title:'首页' },
        component: () => import('@/view/systemLayout/manageSystem/home/home')
      },{
        path: 'activityManage',
        name: 'activityList',
        meta: { title:'活动管理' },
        component: none,
        children: [{
          path: 'list',
          name: 'activityList',
          meta: { title:'活动列表' },
          component: () => import('@/view/systemLayout/manageSystem/activityManage')
        },{
          path: 'release',
          name: 'activityRelease',
          meta: { title:'活动发布' },
          component: () => import('@/view/systemLayout/manageSystem/activityManage/release/index')
        },],
      },{
        path: '/userManage',
        name: 'userManage',
        meta: { title:'会员管理' },
        component: () => import('@/view/systemLayout/manageSystem/userManage')
      }]
    },
  ]
})
