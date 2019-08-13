import crypto from 'crypto'
import apiClient from '../utils/apiClient.js'

const defaultState = {
  playerPubToken: null,
  stamps: [],
  fragments: [],
  errorMessage: null
}

const types = {
  SET_TOKEN: 'SET_TOKEN',
  UPDATE_FRAGMENT: 'UPDATE_FRAGMENT',
  UPDATE_STAMPS: 'UPDATE_STAMPS',
  UPDATE_ERROR_MESSAGE: 'UPDATE_ERROR_MESSAGE'
}

const getters = {
  fragments: (state) => state.fragments,
  stamps: (state) => state.stamps,
  playerPubToken: (state) => state.playerPubToken,
  puzzleErrorMessage: (state) => state.errorMessage
}

const actions = {
  setPubTokenFromToken: (context, token) => {
    const hashGen = crypto.createHash('sha1')
    hashGen.update(token)
    const pubToken = hashGen.digest('hex')

    context.commit('SET_TOKEN', pubToken)
  },
  setPubToken: (context, pubToken) => {
    context.commit('SET_TOKEN', pubToken)
  },
  fetchPuzzleBook: async (context) => {
    try {
      const res = await apiClient.player.getUserStamps(context.state.playerPubToken)
      const { puzzles: fragments, deliverers: slugOfStamps } = res
      context.commit('UPDATE_FRAGMENT', fragments || [])
      context.commit('UPDATE_STAMPS', slugOfStamps || [])
    } catch (e) {
      const { response: { data: { message } } } = e
      context.commit('SET_TOKEN', null)
      context.commit('UPDATE_ERROR_MESSAGE', message)
      context.commit('UPDATE_FRAGMENT', [])
      context.commit('UPDATE_STAMPS', [])
    }
  }
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.playerPubToken = token
  },
  UPDATE_FRAGMENT: (state, fragments) => {
    state.fragments = fragments
  },
  UPDATE_STAMPS: (state, stamps) => {
    state.stamps = stamps
  },
  UPDATE_ERROR_MESSAGE: (state, message) => {
    state.errorMessage = message
  }
}

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
  types
}
