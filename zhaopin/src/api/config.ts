import axios from 'axios'
import Vue from 'vue'
// 配置api地址
// axios设置

const baseURL = Vue.prototype.$baseURL === 'gov' ? process.env.VUE_APP_BASE_API_GOV : process.env.VUE_APP_BASE_API_ENT

const $ajax = axios.create({
  baseURL,
  timeout: 5000,
  withCredentials: true
})
/* 拦截器 */
$ajax.interceptors.request.use((config) => {
  // 在请求发送之前做一些事
  // console.log('--发送之前--')
  // 获取插入token
  return config
}, function (error) {
  // 当出现请求错误是做一些事
  // console.log('--请求出错--', error)
  return Promise.reject(error)
})
// 添加一个返回拦截器
$ajax.interceptors.response.use((response) => {
  // 判断是否需要重新登录
  return response
}, function (error) {
  // console.log('--返回出错--', error)
  // 对返回的错误进行一些处理全局弹窗
  return Promise.reject(error)
})

export default $ajax
