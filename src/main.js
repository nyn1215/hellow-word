// with polyfills
// import 'core-js/stable'
import 'babel-polyfill';
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
import { exportExcel } from "@api";
// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'

import moment from 'moment'; 
import 'moment/locale/zh-cn'; 
moment.locale('zh-cn');

import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './utils/filter' // global filter
import './components/global.less'
import '@/common/css/index.less'

import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import * as req from './request'
console.log(req)
Vue.prototype.$api = req;

Vue.use(VueQuillEditor)

Vue.config.productionTip = false
 
Vue.prototype.$exportExcel = exportExcel;
// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
