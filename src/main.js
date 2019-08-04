import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Components from './components'
import i18n from './i18n'
import Vuex from 'vuex'
import Store from './store'

Vue.config.productionTip = false

Object.keys(Components).forEach(key => {
  Vue.component(key, Components[key])
})

Vue.use(Vuex)

new Vue({
  router,
  i18n,
  Store,
  render: h => h(App)
}).$mount('#app')
