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
