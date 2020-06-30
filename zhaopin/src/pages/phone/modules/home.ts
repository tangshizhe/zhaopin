import { getPhone, wxSendCode, bindPhone, replacePhone, replaceAdminPhone, entinfo, wxEmailCode, mailbind, mailreplace } from '../api/home'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    // 获取绑定手机号
    async getPhone (state: any, data: any) {
      try {
        const res = await getPhone(data)
        return res.data
      } catch (error) {}
    },
    // 微信端发送短信
    async wxSendCode (state: any, data: any) {
      try {
        const res = await wxSendCode(data)
        return res.data
      } catch (error) {}
    },
    // 绑定手机号
    async bindPhone (state: any, data: any) {
      try {
        const res = await bindPhone(data)
        return res.data
      } catch (error) {}
    },
    // 验证、修改手机号
    async replacePhone (state: any, data: any) {
      try {
        const res = await replacePhone(data)
        return res.data
      } catch (error) {}
    },
    // 验证、修改管理员手机号
    async replaceAdminPhone (state: any, data: any) {
      try {
        const res = await replaceAdminPhone(data)
        return res.data
      } catch (error) {}
    },
    // 查询企业信息
    async entinfo (state: any, data: any) {
      try {
        const res = await entinfo(data)
        return res.data
      } catch (error) {}
    },
    // 发送邮箱验证码
    async wxEmailCode (state: any, data: any) {
      try {
        const res = await wxEmailCode(data)
        return res.data
      } catch (error) {}
    },
    // 绑定邮箱
    async mailbind (state: any, data: any) {
      try {
        const res = await mailbind(data)
        return res.data
      } catch (error) {}
    },
    // 更换邮箱
    async mailreplace (state: any, data: any) {
      try {
        const res = await mailreplace(data)
        return res.data
      } catch (error) {}
    }
  },
  getters: {}
}
