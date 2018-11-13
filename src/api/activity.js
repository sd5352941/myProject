import request from '@/utils/request'

export function getActivity(params) {
  return request({
    url:'/activity/query',
    method:'get',
    params,
  })
}
