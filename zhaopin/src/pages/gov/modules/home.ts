import { index, order } from '../api/home'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async index (state: any) {
      try {
        const res = await index()
        console.log(state)
        return res
      } catch (error) {}
    },
    async order (state: any, data: any) {
      try {
        const res = await order(data)
        console.log(state)
        return res
      } catch (error) {}
    }
  },
  getters: {}
}
