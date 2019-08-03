import Vue from 'vue'
import Router from 'vue-router'

import Booth from '@/views/Booth.vue'
import PuzzleList from '@/views/PuzzleList.vue'

import Reward from '@/views/Reward.vue'
import Bingo from '@/views/Bingo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: PuzzleList },
    { path: '/booth', component: Booth },
    { path: '/Reward', component: Reward },
    { path: '/Bingo', component: Bingo }
  ]
})
