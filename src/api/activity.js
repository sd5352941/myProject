import request from '@/utils/request'

export function getActivity(params) {
  return request({
    url:'/activity/query',
    method:'get',
    params,
  })
}

export function getActivityDetail(params) {
  return request({
    url:'/activity/detail',
    method:'get',
    params,
  })
}

export function addActivity(data) {
  return request({
    url: '/activity/add',
    method: 'post',
    data
  })
}

export function uploadIMG(data) {
  return request({
    url: '/activity/uploadIMG',
    method: 'post',
    data
  })
}
