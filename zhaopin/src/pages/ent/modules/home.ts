import {
  enterPrise,
  selectent,
  entinfo,
  industryclass,
  dissolution,
  banklist,
  addbank,
  bankdetails,
  delbank,
  association,
  getUscc,
  imgUpload,
  companySubmit,
  authAgain,
  getPhone,
  modifybank,
  authResult,
  personalSubmit,
  personalResult,
  userInfo
} from '../api/home'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async enterPrise (state: any, data: any) {
      try {
        const res = await enterPrise(data)
        console.log(state)
        return res
      } catch (error) {}
    },
    async selectent (state: any, data: any) {
      try {
        const res = await selectent(data)
        return res
      } catch (error) {}
    },
    async entinfo (state: any, data: any) {
      try {
        const res = await entinfo(data)
        return res
      } catch (error) {}
    },
    // 选择行业
    async industryclass (state: any, data: any) {
      try {
        const res = await industryclass(data)
        return res
      } catch (error) {}
    },
    async dissolution (state: any, data: any) {
      try {
        const res = await dissolution(data)
        return res
      } catch (error) {}
    },
    // 银行账户列表
    async banklist (state: any, data: any) {
      try {
        const res = await banklist(data)
        return res
      } catch (error) {}
    },
    // 添加银行账户
    async addbank (state: any, data: any) {
      try {
        const res = await addbank(data)
        return res
      } catch (error) {}
    },
    // 银行账户详情
    async bankdetails (state: any, data: any) {
      try {
        const res = await bankdetails(data)
        return res
      } catch (error) {}
    },
    // 删除银行账户
    async delbank (state: any, data: any) {
      try {
        const res = await delbank(data)
        return res
      } catch (error) {}
    },
    // 修改银行账户
    async modifybank (state: any, data: any) {
      try {
        const res = await modifybank(data)
        return res.data
      } catch (error) {}
    },
    // 获取已绑定的手机号
    async getPhone (state: any, data: any) {
      try {
        const res = await getPhone(data)
        return res.data
      } catch (error) {}
    },
    // 企业认证企业名字联想
    async association (state: any, data: any) {
      try {
        const res = await association(data)
        return res.data
      } catch (error) {}
    },
    // 企业统一社会信用代码查询
    async getUscc (state: any, data: any) {
      try {
        const res = await getUscc(data)
        return res.data
      } catch (error) {}
    },
    // 图片上传
    async imgUpload (state: any, data: any) {
      try {
        const res = await imgUpload(data)
        return res.data
      } catch (error) {}
    },
    // 企业审核提交
    async companySubmit (state: any, data: any) {
      try {
        const res = await companySubmit(data)
        return res.data
      } catch (error) {}
    },
    // 个人认证提交
    async personalSubmit (state: any, data: any) {
      try {
        const res = await personalSubmit(data)
        return res.data
      } catch (error) {}
    },
    // 重新认证
    async authAgain (state: any, data: any) {
      try {
        const res = await authAgain(data)
        return res.data
      } catch (error) {}
    },
    // 企业认证结果
    async authResult (state: any, data: any) {
      try {
        const res = await authResult(data)
        return res.data
      } catch (error) {}
    },
    // 个人认证结果
    async personalResult (state: any, data: any) {
      try {
        const res = await personalResult(data)
        return res.data
      } catch (error) {}
    },
    // 个人信息
    async userInfo (state: any, data: any) {
      try {
        const res = await userInfo(data)
        return res.data
      } catch (error) {}
    }
  },
  getters: {}
}
