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
