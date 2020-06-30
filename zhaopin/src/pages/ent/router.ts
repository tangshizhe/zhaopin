export default [
  {
    path: '/',
    name: 'mine',
    component: () => import(/* webpackChunkName: "ent-main" */ './views/Mine.vue'),
    meta: {
      title: '我的'
    }
  },
  {
    path: '/enterprise',
    name: 'enterprise',
    component: () => import(/* webpackChunkName: "ent-main" */ './views/Enterprise.vue'),
    meta: {
      title: '我的企业'
    }
  },
  {
    path: '/entcontent',
    name: 'entcontent',
    component: () => import(/* webpackChunkName: "ent-main" */ './views/ent_content.vue'),
    meta: {
      title: '我的企业'
    }
  },
  {
    path: '/management',
    name: 'management',
    component: () => import(/* webpackChunkName: "ent-main" */ './views/management.vue'),
    meta: {
      title: '企业管理'
    }
  },
  {
    path: '/instury',
    name: 'instury',
    component: () => import(/* webpackChunkName: "ent-main" */ './views/instury.vue'),
    meta: {
      title: '所属行业'
    }
  },
  {
    path: '/bank',
    name: 'bank',
    component: () => import(/* webpackChunkName: "ent-main" */ './views/bank.vue'),
    meta: {
      title: '银行账户'
    }
  },
  {
    path: '/banklist',
    name: 'banklist',
    component: () => import(/* webpackChunkName: "ent-main" */ './views/banklist.vue'),
    meta: {
      title: '银行账户'
    }
  },
  {
    path: '/bankdetail',
    name: 'bankdetail',
    component: () => import(/* webpackChunkName: "ent-main" */ './views/bankdetail.vue'),
    meta: {
      title: '银行账户'
    }
  },
  {
    path: '/authResult',
    name: 'authResult',
    component: () => import(/* webpackChunkName: "ent-main" */ './views/AuthResult.vue'),
    meta: {
      auth: true,
      title: '企业认证'
    }
  },
  {
    path: '/entAuth',
    name: 'entAuth',
    component: () => import(/* webpackChunkName: "ent-main" */ './views/EntAuth.vue'),
    meta: {
      auth: true,
      title: '企业认证'
    }
  },
  {
    path: '/personalAuth',
    name: 'personalAuth',
    component: () => import(/* webpackChunkName: "ent-main" */ './views/PersonalAuth.vue'),
    meta: {
      auth: true,
      title: '实名认证'
    }
  },
  {
    path: '/personalAuthResult',
    name: 'personalAuthResult',
    component: () => import(/* webpackChunkName: "ent-main" */ './views/PersonalAuthResult.vue'),
    meta: {
      auth: true,
      title: '实名认证'
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import(/* webpackChunkName: "ent-main" */ './views/Mine.vue'),
    meta: {
      auth: true,
      title: '我的'
    }
  },
  {
    path: '/account',
    name: 'account',
    component: () => import(/* webpackChunkName: "ent-main" */ './views/Account.vue'),
    meta: {
      auth: true,
      title: '账户与安全'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "funds-main" */ './views/404.vue'),
    meta: {
      title: '404',
      keepAlive: true
    }
  }
]
