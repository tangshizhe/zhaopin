export default [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "ent-main" */ './views/Home.vue'),
    meta: {
      title: '政务服务'
    }
  },
  {
    path: '/changeCity',
    name: 'changeCity',
    component: () => import(/* webpackChunkName: "ent-main" */ './views/ChangeCity.vue'),
    meta: {
      title: '政务服务'
    }
  },
  {
    path: '/application',
    component: () => import(/* webpackChunkName: "funds-main" */ './views/application/application.vue'),
    children: [
      {
        path: '/',
        name: 'intro',
        component: () => import(/* webpackChunkName: "funds-main" */ './views/application/intro.vue'),
        meta: {
          auth: true,
          title: '财政扶持资金-介绍'
        }
      },
      {
        path: 'process',
        name: 'application-process',
        component: () => import(/* webpackChunkName: "funds-main" */ './views/application/process.vue'),
        meta: {
          auth: true,
          title: '财政扶持资金-详细流程'
        }
      },
      {
        path: 'receipts',
        name: 'upload-receipts',
        component: () => import(/* webpackChunkName: "funds-main" */ './views/application/uploadReceipts.vue'),
        meta: {
          auth: true,
          title: '上传收据'
        }
      },
      {
        path: 'materials',
        name: 'paper-materials',
        component: () => import(/* webpackChunkName: "funds-main" */ './views/application/paperMaterials.vue'),
        meta: {
          auth: true,
          title: '递交纸质材料'
        }
      },
      {
        path: 'confirm',
        name: 'to-confirm',
        component: () => import(/* webpackChunkName: "funds-main" */ './views/application/toConfirm.vue'),
        meta: {
          auth: true,
          title: '财政扶持资金'
        }
      }
    ]
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
