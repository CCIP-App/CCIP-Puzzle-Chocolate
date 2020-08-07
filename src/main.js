import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Components from './components'
import i18n from './i18n'
import store from './store'
import VueQrcodeReader from 'vue-qrcode-reader'

Vue.config.productionTip = false
Vue.use(VueQrcodeReader)

if (!MediaStreamTrack.prototype.getCapabilities) {
  MediaStreamTrack.prototype.getCapabilities = () => {}
}

Object.keys(Components).forEach(key => {
  Vue.component(key, Components[key])
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event('x-app-rendered'))
}).$mount('#app')
