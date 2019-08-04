import crypto from 'crypto'
import apiClient from '../utils/apiClient.js'

const defaultState = {
  playerPubToken: null,
  stamps: [],
  fragments: []
}

const types = {
  SET_TOKEN: 'SET_TOKEN',
  UPDATE_FRAGMENT: 'UPDATE_FRAGMENT',
  UPDATE_STAMPS: 'UPDATE_STAMPS'
}

const getters = {
  fragments: (state) => state.fragments
}

const actions = {
  setPubTokenFromToken: (context, token) => {
    const hashGen = crypto.createHash('sha1')
    hashGen.update(token)
    const pubToken = hashGen.digest('hex')

    context.commit('SET_TOKEN', pubToken)
  },
  fetchPuzzleBook: async (context) => {
    const res = await apiClient.player.getUserStamps(context.state.playerPubToken)
    const { puzzles: fragments, delivers: slugOfStamps } = res.data
    context.commit('UPDATE_FRAGMENT', fragments)
    context.commit('UPDATE_STAMPS', slugOfStamps)
  }
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  UPDATE_FRAGMENT: (state, fragments) => {
    state.fragments = fragments
  },
  UPDATE_STAMPS: (state, stamps) => {
    state.stamps = stamps
  }
}

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
  types
}
