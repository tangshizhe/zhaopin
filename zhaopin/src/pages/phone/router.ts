export default [
  {
    path: '/',
    alias: '/bindPhone',
    name: 'bindPhone',
    component: () => import(/* webpackChunkName: "ent-phone-main" */ './views/BindPhone.vue'),
    meta: {
      auth: true,
      title: '绑定手机号'
    }
  },
  {
    path: '/changePhone',
    name: 'changePhone',
    component: () => import(/* webpackChunkName: "ent-phone-main" */ './views/ChangePhone.vue'),
    meta: {
      auth: true,
      title: '更换手机号'
    }
  },
  {
    path: '/bindPhone',
    name: 'bindPhone',
    component: () => import(/* webpackChunkName:"ent-phone-main" */ './views/BindPhone.vue'),
    meta: {
      auth: true,
      title: '绑定手机号'
    }
  },
  {
    path: '/changeManage',
    name: 'changeManage',
    component: () => import(/* webpackChunkName: "ent-phone-main" */ './views/ChangeManage.vue'),
    meta: {
      auth: true,
      title: '更换管理员'
    }
  },
  {
    path: '/changeEmail',
    name: 'changeEmail',
    component: () => import(/* webpackChunkName: "ent-phone-main" */ './views/ChangeEmail.vue'),
    meta: {
      auth: true,
      title: '企业邮箱'
    }
  },
  {
    path: '/setemail',
    name: 'setemail',
    component: () => import(/* webpackChunkName: "ent-phone-main" */ './views/SetEmail.vue'),
    meta: {
      auth: true,
      title: '企业邮箱'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "ent-phone-main" */ './views/404.vue'),
    meta: {
      title: '404',
      keepAlive: true
    }
  }
]
