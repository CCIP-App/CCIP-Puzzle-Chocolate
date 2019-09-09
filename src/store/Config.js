import axios from 'axios'
import { configURL } from '../../config/project.json'

const defaultState = {
  confName: '',
  title: {
    'zh-TW': '',
    en: ''
  },
  description: {
    'zh-TW': '',
    en: ''
  },
  bingoPattern: '',
  booths: []
}

const types = {
  UPDATE_CONFIG: 'UPDATE_CONFIG'
}

const getters = {
  confName: state => state.confName,
  title: state => lang => state.title[lang],
  description: state => lang => state.description[lang],
  bingoPattern: state => state.bingoPattern,
  booths: state => state.booths,
  booth: state => slug => state.booths.find(booth => booth.slug === slug)
}

const actions = {
  fetchGameConfig: async (context) => {
    if (configURL) {
      const { data: response } = await axios.get(configURL)
      context.commit(types.UPDATE_CONFIG, response)
    }
  }
}

const mutations = {
  UPDATE_CONFIG: (state, data) => {
    state.booths = data.booths
    state.confName = data.confName
    state.title = data.title
    state.description = data.description
    state.bingoPattern = data.bingoPattern
  }
}

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
  types
}
