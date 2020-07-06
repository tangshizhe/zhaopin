export default [
  {
    path: '/worker',
    name: 'worker',
    component: () => import(/* webpackChunkName: "ent-main" */ './views/worker/worker.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/find',
    name: 'find',
    component: () => import(/* webpackChunkName: "ent-main" */ './views/find/find.vue'),
    meta: {
      title: '发现'
    }
  },
  {
    path: '/message',
    name: 'message',
    component: () => import(/* webpackChunkName: "ent-main" */ './views/message/message.vue'),
    meta: {
      title: '消息'
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import(/* webpackChunkName: "ent-main" */ './views/mine/mine.vue'),
    meta: {
      title: '我的'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "ent-main" */ './views/mine/login.vue'),
    meta: {
      title: '登录'
    }
  }
]
