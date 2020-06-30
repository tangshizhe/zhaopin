import Vue from 'vue'
import '@/utils/'

// 引入全局组件
import globalComponent from '@/assets/js/globalComponents'

Vue.prototype.$baseURL = 'gov'
Vue.config.productionTip = false

// 注册全局组件
Vue.use(globalComponent)
