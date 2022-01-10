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

/**
 * 文件上传接口
 * @param data 文件流
 * @param name 存放文件名
 * @returns {*}
 */
export function uploadIMG(data,name) {
  let config = {
    headers:{'Content-Type':'multipart/form-data','fileName': name},
  }

  return request.post('/activity/uploadIMG',data, config)
  // return request({
  //   url: '/activity/uploadIMG',
  //   method: 'post',
  //   formData: data
  // })
}

/**
 * 暂存活动详情数据
 * @param data 活动详情数据
 * @returns {*}
 */

export function cacheAcData(data) {
  return request({
    url: '/activity/cache',
    method: 'post',
    data
  })
}

export function signUpActivity(data) {
  return request({
    url: '/activity/signUp',
    method: 'post',
    data
  })
}

export function getMyActivities() {
  return request({
    url: '/activity/myActivities',
    method: 'get',
  })
}

export function deleteActivity(data) {
  return request({
    url: '/activity/delete',
    method: 'post',
    data
  })
}
