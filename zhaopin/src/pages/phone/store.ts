import Vue from 'vue'
import Vuex from 'vuex'
if (process.env.NODE_DEV !== 'production') {
  Vue.use(Vuex)
}

const files = require.context('./modules', false, /\.ts$/)
const modules: any = {}

files.keys().forEach(key => {
  const tempK = key.replace(/(\.\/|\.ts)/g, '')
  modules[tempK] = files(key).default
})

export default new Vuex.Store({
  state: {
    pageTitle: 'Funds'
  },
  mutations: {
    updatePageTitle (state, title) {
      state.pageTitle = title
    }
  },
  actions: {
  },
  modules
})
