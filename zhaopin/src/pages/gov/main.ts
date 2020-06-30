import 'amfe-flexible'
import './config'
import Vue from 'vue'
import App from './App.vue'
import router from '@/router/'
import store from './store'

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title
  store.commit('updatePageTitle', to.meta.title)
  // 验证token和重定向
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount(`#app-${Vue.prototype.$baseURL}-page`)
