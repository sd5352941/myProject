import request from '@/utils/request'

export function register(data) {
  return request({
    url:'/user/add',
    method:'post',
    data,
  })
}

export function login(data) {
  return request({
    url:'/user/login',
    method:'post',
    data,
  })
}

/**
 * 查询当前用户活动列表
 */
export function getUserActivities() {
  return request({
    url: `/user/activities`,
    method: `get`
  })
}

/**
 * 查询用户信息
 */
export function getUserData(params) {
  return request({
    url: `/user/getData`,
    method: `get`,
    params
  })
}
/**
 * 关注用户
 */
export function concernUser(data) {
  return request({
    url: `/user/follow`,
    method: `post`,
    data
  })
}
/**
 * 查询用户信息
 */
export function commitUserData(data) {
  return request({
    url: `/user/save`,
    method: `post`,
    data
  })
}

/**
 * 提交个人主页数据
 */
export function commitHomePage(data) {
  return request({
    url: `/user/homePage`,
    method: `post`,
    data
  })
}

/**
 * 获取用户群
 */

export function getUsers(data) {
  return request({
    url: `/user/getUsers`,
    method: `post`,
    data
  })
}
