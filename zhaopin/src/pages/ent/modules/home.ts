import {
  indexpage
} from '../api/home'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async indexpage (state: any, data: any) {
      try {
        const res = await indexpage(data)
        console.log(state)
        return res
      } catch (error) {}
    }
  },
  getters: {}
}
