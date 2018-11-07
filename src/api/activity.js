import request from '@/utils/request'

export function getActivityList() {
  return request({
    url:'/activity/query',
    method:'post',
  })
}
