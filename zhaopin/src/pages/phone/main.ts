import 'amfe-flexible'
import './config'
import Vue from 'vue'
import App from './App.vue'
import router from '@/router/'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.css'
import globalComponent from '@/assets/js/globalComponents'

Vue.use(Vant)
Vue.config.productionTip = false

// 注册全局组件
Vue.use(globalComponent)

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
