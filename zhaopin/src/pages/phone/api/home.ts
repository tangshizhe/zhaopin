import request from '@/api/config.ts'
// 获取已绑定手机号
export function getPhone (data: any) {
  return request({
    url: '/entbase/phone/bound',
    method: 'post',
    data
  })
}
// 微信端发送短信验证码
export function wxSendCode (data: any) {
  return request({
    url: '/entbase/phone/sendIdentCode',
    method: 'post',
    data
  })
}
// 绑定手机号
export function bindPhone (data: any) {
  return request({
    url: '/entbase/phone/bind',
    method: 'post',
    data
  })
}
// 验证、修改手机号
export function replacePhone (data: any) {
  return request({
    url: '/entbase/phone/replace/me',
    method: 'post',
    data
  })
}
// 验证、修改管理员手机号
export function replaceAdminPhone (data: any) {
  return request({
    url: '/entbase/phone/replace/admin',
    method: 'post',
    data
  })
}
// 查询企业信息
export function entinfo (data: any) {
  return request({
    url: '/entbase/ent/entinfo',
    method: 'post',
    data
  })
}
// 发送邮箱验证码
export function wxEmailCode (data: any) {
  return request({
    url: '/entbase/mail/sendIdentCode',
    method: 'post',
    data
  })
}
// 绑定邮箱
export function mailbind (data: any) {
  return request({
    url: '/entbase/mail/bind',
    method: 'post',
    data
  })
}
// 更换邮箱
export function mailreplace (data: any) {
  return request({
    url: '/entbase/mail/replace',
    method: 'post',
    data
  })
}
