import Vue from 'vue'
import 'default-passive-events'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import './assets/iconfont/iconfont.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css
import '@/styles/show.css'

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
// vue中导出excel表格模板
import FileSaver from 'file-saver'
// // import XLSX from 'xlsx'
import  XLSX from 'xlsx'


Vue.prototype.$FileSaver = FileSaver; //设置全局
Vue.prototype.$XLSX = XLSX; //设置全局

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ElementUI,{locale})
Vue.use(ViewUI);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
