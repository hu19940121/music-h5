// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'

import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://127.0.0.1:7002' // 服务端连接
}))

// sentry监控
// import * as Sentry from '@sentry/vue'

// import { Integrations } from '@sentry/tracing'
// Sentry.init({
//   Vue,
//   dsn: 'http://3c05d2752f3b458a8d97adc6046d17d9@music.kaier001.com:9000/4',
//   autoSessionTracking: true,
//   integrations: [
//     new Integrations.BrowserTracing()
//   ],

//   // We recommend adjusting this value in production, or using tracesSampler
//   // for finer control
//   tracesSampleRate: 1.0
// })

import App from './App.vue'

// import Vconsole from 'vconsole' // 调试

import router from './router'
import store from './store'
// import Meta from 'vue-meta'
// Vue.use(Meta)

// 设置 js中可以访问 $cdn
import { $cdn } from '@/config'
Vue.prototype.$cdn = $cdn

import '@/icons' // icon

// 全局引入按需引入UI库 vant
import '@/plugins/vant'
// 引入全局样式
import '@/assets/css/index.scss'
// 移动端适配
import 'lib-flexible/flexible.js'

// filters
import './filters'

// 国际化
import i18n from './i18n'
Vue.config.productionTip = false

import share from './share'
Vue.prototype.$share = share
const defaultSettgs = require('./config/index.js')
console.log('defaultSettgs.vconsole', defaultSettgs.vconsole)
// if (defaultSettgs.vconsole === 'on') {
// // eslint-disable-next-line no-unused-vars
//   const vConsole = new Vconsole()
// }

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  // 添加到这里,这里的render-event和vue.config.js里面的renderAfterDocumentEvent配置名称一致
  // mounted() {
  //   document.dispatchEvent(new Event('render-event'))
  // },
  render: h => h(App)
})
