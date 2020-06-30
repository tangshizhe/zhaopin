// eslint-disable-next-line @typescript-eslint/no-var-requires
const { pages } = require('./pages.config')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const merge = require('webpack-merge')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsImportPluginFactory = require('ts-import-plugin')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const autoprefixer = require('autoprefixer')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pxtorem = require('postcss-pxtorem')

const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  'js-cookie': 'Cookies',
  vant: 'vant'
}
module.exports = {
  publicPath: process.env.BASE_URL,
  devServer: {
    proxy: {
      '/ent-api': {
        target: 'http://web-qmxrjj.jianyu360.cn',
        // target: 'http://192.168.3.207:815',
        changeOrigin: true,
        pathRewrite: {
          '^/ent-api': ''
        }
      },
      '/gov-api': {
        target: 'http://web-jydev-wky.jianyu360.cn',
        // target: 'http//:192.168.20.135:815',
        changeOrigin: true,
        pathRewrite: {
          '^/gov-api': ''
        }
      }
    }
  },
  pages,
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/style/_mixin.scss";@import "@/style/_variables.scss";@import "@/style/base.scss";@import "@/style/common.scss";' // 全局引入
      },
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  },
  chainWebpack: config => {
    // 防止多页面打包卡顿
    // eslint-disable-next-line no-unused-expressions
    // config.plugins.delete('named-chunks')
    // 打包时手动修改
    if (process.env.NODE_DEV === 'production') {
      config.externals(externals)
    }
    if (process.env.use_analyzer) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        })
        return options
      })
    // return config
  }
}
