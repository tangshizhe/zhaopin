import Vue from 'vue'
import VueRouter from 'vue-router'

if (process.env.NODE_DEV !== 'production') {
  Vue.use(VueRouter)
}

const routesBase = Vue.prototype.$baseURL

let routes: any[] = []
const routerContext = require.context('../pages/', true, /router\.ts$/)

routerContext.keys().filter((v: string) => v.startsWith('./' + routesBase)).forEach(route => {
  const routerModule = routerContext(route)
  routes = routes.concat(routerModule.default || routerModule)
})

const tempObj: any = {
  path: '*',
  redirect: {
    name: '404'
  }
}

routes = routes.concat(tempObj)

const myRouter = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL + routesBase,
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes
})

export default myRouter
