import axios from 'axios'
import {getToken} from "@/utils/auth";

import {Message} from 'element-ui'

var request = axios.create({
  baseURL: process.env.BASE_API,
  // baseURL: 'http://175.178.40.9:3001',
  timeout: 10000
})

/**
 * request拦截器
 */
request.interceptors.request.use(
  req => {
    if(getToken())  req.headers['token'] = getToken()
    return req
  }
)

/**
 * response拦截器
 */
request.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 2000) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
      // if (res.state === 401) {
      //   removeToken()
      //   route.push('login')
      // }
    } else {
      return response
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default request
