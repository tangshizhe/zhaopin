import request from '@/api/config.ts'

export function index () {
  return request({
    url: '/Index/index',
    method: 'get'
  })
}

export function order (data: any) {
  return request({
    url: '/Order/allorder',
    method: 'post',
    data
  })
}
