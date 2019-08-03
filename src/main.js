import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Components from './components/_index'
import i18n from './i18n'

Vue.config.productionTip = false

Object.keys(Components).forEach(key => {
  Vue.component(key, Components[key])
})

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
