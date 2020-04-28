import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'

import toast from 'components/common/toast'

import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)

//安装lazyload
Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/loading.gif')
})

//解决移动端300ms延迟
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store,
  toast
}).$mount('#app')
