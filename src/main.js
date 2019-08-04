import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Components from './components'
import i18n from './i18n'
import store from './store'

Vue.config.productionTip = false

Object.keys(Components).forEach(key => {
  Vue.component(key, Components[key])
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
