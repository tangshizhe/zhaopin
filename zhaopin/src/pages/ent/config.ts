import Vue from 'vue'
import '@/utils/'

import globalComponent from '@/assets/js/globalComponents'

Vue.prototype.$baseURL = 'ent'
Vue.config.productionTip = false

// 注册全局组件
Vue.use(globalComponent)
