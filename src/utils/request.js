import axios from 'axios'

var request = axios.create({
  baseURL: process.env.BASE_API,
  // timeout: 6000
})


export default request
