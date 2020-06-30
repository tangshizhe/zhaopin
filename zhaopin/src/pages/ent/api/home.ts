import request from '@/api/config.ts'
// 我的企业列表
export function enterPrise (data: any) {
  return request({
    url: '/entbase/ent/myents',
    method: 'post',
    data
  })
}

// 选择企业
export function selectent (data: any) {
  return request({
    url: '/entbase/ent/selectent',
    method: 'post',
    data
  })
}

// 企业信息
export function entinfo (data: any) {
  return request({
    url: '/entbase/ent/entinfo',
    method: 'post',
    data
  })
}

// 设置行业
export function industryclass (data: any) {
  return request({
    url: '/entbase/ent/set/industryclass',
    method: 'post',
    data
  })
}

// 注销企业
export function dissolution (data: any) {
  return request({
    url: '/entbase/ent/dissolution',
    method: 'post',
    data
  })
}

// 银行账户列表
export function banklist (data: any) {
  return request({
    url: '/entbase/bank/list',
    method: 'post',
    data
  })
}

// 银行账户详情
export function bankdetails (data: any) {
  return request({
    url: '/entbase/bank/details',
    method: 'post',
    data
  })
}

// 添加银行账户
export function addbank (data: any) {
  return request({
    url: '/entbase/bank/add',
    method: 'post',
    data
  })
}

// 删除银行账户
export function delbank (data: any) {
  return request({
    url: '/entbase/bank/deleteOne',
    method: 'post',
    data
  })
}

// 修改银行账户
export function modifybank (data: any) {
  return request({
    url: '/entbase/bank/update',
    method: 'post',
    data
  })
}

// 获取已绑定的手机号
export function getPhone (data: any) {
  return request({
    url: '/entbase/phone/bound',
    method: 'post',
    data
  })
}

// 企业认证企业名字联想
export function association (data: any) {
  return request({
    url: '/entbase/ent/association',
    method: 'post',
    data
  })
}

// 企业统一社会信用代码查询
export function getUscc (data: any) {
  return request({
    url: '/entbase/ent/uscc',
    method: 'post',
    data
  })
}

// 图片上传
export function imgUpload (data: any) {
  return request({
    url: '/entbase/authenticate/imgUpload',
    method: 'post',
    data,
    timeout: 60 * 3 * 1000
  })
}

// 企业审核提交
export function companySubmit (data: any) {
  return request({
    url: '/entbase/ent/authenticate/submit',
    method: 'post',
    data
  })
}

// 个人认证提交
export function personalSubmit (data: any) {
  return request({
    url: '/entbase/user/authenticate/submit',
    method: 'post',
    data
  })
}

// 重新认证
export function authAgain (data: any) {
  return request({
    url: '/entbase/ent/authenticate/authAgain',
    method: 'post',
    data
  })
}

// 企业认证结果
export function authResult (data: any) {
  return request({
    url: '/entbase/ent/authenticate/result',
    method: 'post',
    data
  })
}

// 个人认证成功结果
export function personalResult (data: any) {
  return request({
    url: '/entbase/user/authenticate/result',
    method: 'post',
    data
  })
}

// 个人信息
export function userInfo (data: any) {
  return request({
    url: '/entbase/user/userinfo',
    method: 'post',
    data
  })
}
