import Vue from 'vue'
import Vuex from 'vuex'
import Config from './Config.js'
import Puzzle from './Puzzle.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    Config,
    Puzzle
  }
})
