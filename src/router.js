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
    { path: '/stamp', component: Stamp },
    { path: '/reward', component: Reward },
    { path: '/bingo', component: Bingo },
    { path: '/fragment', component: Fragment }
  ]
})
