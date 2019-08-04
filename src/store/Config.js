import axios from 'axios'
import { configURL } from '../../config/project.json'

const defaultState = {
  confName: 'OPass',
  title: {
    'zh-TW': '大地集章',
    en: 'Rewards'
  },
  bingoPatterns: '',
  booths: [
    {
      isBonus: true,
      significant: 'c',
      slug: 'opass',
      displayText: {
        'zh-TW': 'OPass 快速通關',
        en: 'OPass Check-in'
      },
      description: {
        'zh-TW': 'OPass 快速通關開發團隊',
        en: 'Develop team of OPass app.'
      },
      imageUrl: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
      point: 0
    }
  ]
}

const types = {
  UPDATE_BOOTH: 'UPDATE_BOOTH'
}

const getters = {
  confName: state => state.confName,
  title: state => lang => state.title[lang],
  bingoPatterns: state => state.bingoPatterns,
  booths: state => state.booths,
  booth: state => slug => state.booths.find(booth => booth.slug === slug)
}

const actions = {
  fetchBooths: async (context) => {
    const response = (await axios.get(configURL)).data
    context.commit(types.UPDATE_BOOTH, response)
  }
}

const mutations = {
  UPDATE_BOOTH: (state, data) => {
    state.booths = data.booths
  }
}

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
  types
}
