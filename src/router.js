import Vue from 'vue'
import Router from 'vue-router'

import Stamp from '@/views/Stamp.vue'

import Reward from '@/views/Reward.vue'
import Bingo from '@/views/Bingo.vue'
import Fragment from '@/views/Fragment.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/Stamp', component: Stamp },
    { path: '/Reward', component: Reward },
    { path: '/Bingo', component: Bingo },
    { path: '/Fragment', component: Fragment }
  ]
})
