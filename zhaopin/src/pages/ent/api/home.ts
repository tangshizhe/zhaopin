import request from '@/api/config.ts'
// 我的企业列表
export function indexpage (data: any) {
  return request({
    url: '/indexpage',
    method: 'post',
    data
  })
}
