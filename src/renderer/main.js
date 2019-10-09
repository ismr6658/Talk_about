import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui'
import {Indicator} from 'mint-ui'
import 'element-ui/lib/theme-chalk/index.css'
import elementUi from 'element-ui'
import Minxin from './mixin'
import {MessageBox } from 'mint-ui'


Vue.mixin(Minxin)

import lodash from 'lodash'
window._=lodash

Vue.use(elementUi)




Vue.prototype.$axios=axios
Vue.prototype.alert=MessageBox

Vue.prototype.URL='http://144.123.27.238:28080/im/im/api'

import Win from 'electron-vue-windows'
Win.init(router)
Vue.prototype.$win=Win

window.Load=Indicator

Vue.use(Mint)

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
