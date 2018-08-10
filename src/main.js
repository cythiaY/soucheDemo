// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'sob-ui/lib/styles/index.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import Utils from 'utils'
import SobUI from 'sob-ui'
import VueBury from '@souche-vue/vue-burying'
import HttpRequest from '@souche-f2e/http-request'
import VuePosition from '@souche-vue/vue-position'
import Tower from '@souche-f2e/tower'
import VueShare from '@souche-vue/vue-share'
import OssImage from '@souche-ui/oss-image'

Vue.use(SobUI)
Vue.use(Utils)
Vue.use(VueBury, {
  env: 'development',
  baseOptions: {
    platform: 'ERP'
  }
})

Vue.use(VuePosition, {
  app: {
    Tower
  },
  http: true
})
Vue.use(VueShare, {
  weixin: true,
  app: {
    Tower: Tower
  }
})
Vue.use(OssImage.component.vue, {
  lazy: {
    // 延迟加载相关配置
  }
})
Vue.config.productionTip = false

// 网络请求库前置钩子
HttpRequest.beforeEach(function (data, next) {
  console.log(data) // data为网络发送前，相关信息
  next() // next如果不执行，则不会往下继续执行
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
