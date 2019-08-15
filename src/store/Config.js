import axios from 'axios'
import { configURL } from '../../config/project.json'

const defaultState = {
  confName: 'OPass',
  title: {
    'zh-TW': '大地集章',
    en: 'Rewards'
  },
  bingoPatterns: 'cscscscscscscscscscscscsc',
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
    },
    {
      isBonus: true,
      significant: 'c',
      slug: 'SITCON 學生計算機年會籌備團隊',
      displayText: {
        'zh-TW': '學生計算機年會',
        en: 'SITCON'
      },
      description: {
        'zh-TW': '來跳坑 SITCON 就可以得到印章喔',
        en: 'Visit SITCON booth and get stamp.'
      },
      imageUrl: 'https://sitcon.org/2019/static/img/sponsor/sitcon.png',
      point: 1000
    },
    { isBonus: true,
      significant: 's',
      slug: 'iis',
      displayText: { 'zh-TW': '中央研究院資訊科學研究所', en: '中央研究院資訊科學研究所' },
      description: { 'zh-TW': '測試敘述', en: 'Test description' },
      imageUrl: 'https://sitcon.org/2019/static/img/sponsor/iis.png',
      point: 16 },
    { isBonus: true,
      significant: 'c',
      slug: 'ocf',
      displayText: { 'zh-TW': '財團法人開放文化基金會', en: '財團法人開放文化基金會' },
      description: { 'zh-TW': '測試敘述', en: 'Test description' },
      imageUrl: 'https://sitcon.org/2019/static/img/sponsor/ocf.png',
      point: 38 },
    { isBonus: true,
      significant: 's',
      slug: 'itsa',
      displayText:
   { 'zh-TW': '教育部資通訊軟體創新人才推升計畫推動中心', en: '教育部資通訊軟體創新人才推升計畫推動中心' },
      description: { 'zh-TW': '測試敘述', en: 'Test description' },
      imageUrl: 'https://sitcon.org/2019/static/img/sponsor/itsa.png',
      point: 71 },
    { isBonus: false,
      significant: 'c',
      slug: 'holistic',
      displayText: { 'zh-TW': '好苙整合設計', en: '好苙整合設計' },
      description: { 'zh-TW': '測試敘述', en: 'Test description' },
      imageUrl: 'https://sitcon.org/2019/static/img/sponsor/hoholistic.png',
      point: 62 },
    { isBonus: false,
      significant: 's',
      slug: 'klickklack',
      displayText: { 'zh-TW': 'KlickKlack', en: 'KlickKlack' },
      description: { 'zh-TW': '測試敘述', en: 'Test description' },
      imageUrl: 'https://sitcon.org/2019/static/img/sponsor/klickklack.png',
      point: 24 },
    { isBonus: true,
      significant: 's',
      slug: 'archilife',
      displayText: { 'zh-TW': '祐生研究基金會', en: '祐生研究基金會' },
      description: { 'zh-TW': '測試敘述', en: 'Test description' },
      imageUrl: 'https://sitcon.org/2019/static/img/sponsor/archilife.png',
      point: 5 },
    { isBonus: true,
      significant: 'c',
      slug: 'skymizer',
      displayText: { 'zh-TW': 'Skymizer', en: 'Skymizer' },
      description: { 'zh-TW': '測試敘述', en: 'Test description' },
      imageUrl: 'https://sitcon.org/2019/static/img/sponsor/skymizer.png',
      point: 24 },
    { isBonus: true,
      significant: 'c',
      slug: 'hkcota',
      displayText: { 'zh-TW': '香港開放創意科技協會', en: '香港開放創意科技協會' },
      description: { 'zh-TW': '測試敘述', en: 'Test description' },
      imageUrl: 'https://sitcon.org/2019/static/img/sponsor/hkcota.png',
      point: 65 },
    { isBonus: false,
      significant: 'c',
      slug: 'tezos',
      displayText:
   { 'zh-TW': 'Tezos Southeast Asia', en: 'Tezos Southeast Asia' },
      description: { 'zh-TW': '測試敘述', en: 'Test description' },
      imageUrl: 'https://sitcon.org/2019/static/img/sponsor/tezos.png',
      point: 43 },
    { isBonus: true,
      significant: 'c',
      slug: 'twnic',
      displayText: { 'zh-TW': '財團法人台灣網路資訊中心', en: '財團法人台灣網路資訊中心' },
      description: { 'zh-TW': '測試敘述', en: 'Test description' },
      imageUrl: 'https://sitcon.org/2019/static/img/sponsor/twnic.png',
      point: 0 },
    { isBonus: true,
      significant: 'c',
      slug: 'coscup',
      displayText: { 'zh-TW': 'COSCUP', en: 'COSCUP' },
      description: { 'zh-TW': '測試敘述', en: 'Test description' },
      imageUrl: 'https://sitcon.org/2019/static/img/sponsor/coscup.png',
      point: 6 },
    { isBonus: true,
      significant: 's',
      slug: 'iii',
      displayText: { 'zh-TW': '資策會數位轉型研究所', en: '資策會數位轉型研究所' },
      description: { 'zh-TW': '測試敘述', en: 'Test description' },
      imageUrl: 'https://sitcon.org/2019/static/img/sponsor/iii.png',
      point: 32 },
    { isBonus: false,
      significant: 's',
      slug: 'datarget',
      displayText: { 'zh-TW': '創代科技股份有限公司', en: '創代科技股份有限公司' },
      description: { 'zh-TW': '測試敘述', en: 'Test description' },
      imageUrl: 'https://sitcon.org/2019/static/img/sponsor/datarget.png',
      point: 3 },
    { isBonus: true,
      significant: 's',
      slug: '104',
      displayText: { 'zh-TW': '一零四資訊科技', en: '一零四資訊科技' },
      description: { 'zh-TW': '測試敘述', en: 'Test description' },
      imageUrl: 'https://sitcon.org/2019/static/img/sponsor/104.png',
      point: 83 },
    { isBonus: false,
      significant: 's',
      slug: 'dcard',
      displayText: { 'zh-TW': 'Dcard 狄卡科技', en: 'Dcard 狄卡科技' },
      description: { 'zh-TW': '測試敘述', en: 'Test description' },
      imageUrl: 'https://sitcon.org/2019/static/img/sponsor/dcard.png',
      point: 20 },
    { isBonus: true,
      significant: 'c',
      slug: 'connectjob',
      displayText: { 'zh-TW': 'Connect Job Agent', en: 'Connect Job Agent' },
      description: { 'zh-TW': '測試敘述', en: 'Test description' },
      imageUrl: 'https://sitcon.org/2019/static/img/sponsor/connectjob.png',
      point: 30 },
    { isBonus: false,
      significant: 'c',
      slug: 'kkbox',
      displayText: { 'zh-TW': 'KKBOX', en: 'KKBOX' },
      description: { 'zh-TW': '測試敘述', en: 'Test description' },
      imageUrl: 'https://sitcon.org/2019/static/img/sponsor/kkbox.png',
      point: 29 },
    { isBonus: true,
      significant: 's',
      slug: 'twchacker',
      displayText:
   { 'zh-TW': '社團法人臺灣校園資訊安全推廣暨駭客培育協會',
     en: '社團法人臺灣校園資訊安全推廣暨駭客培育協會' },
      description: { 'zh-TW': '測試敘述', en: 'Test description' },
      imageUrl: 'https://sitcon.org/2019/static/img/sponsor/twchacker.png',
      point: 90 },
    { isBonus: true,
      significant: 'c',
      slug: 'advantech',
      displayText: { 'zh-TW': '研華科技物聯網開發者大賽', en: '研華科技物聯網開發者大賽' },
      description: { 'zh-TW': '測試敘述', en: 'Test description' },
      imageUrl: 'https://sitcon.org/2019/static/img/sponsor/advantech.png',
      point: 25 },
    { isBonus: false,
      significant: 's',
      slug: 'hackmd',
      displayText: { 'zh-TW': 'HackMD', en: 'HackMD' },
      description: { 'zh-TW': '測試敘述', en: 'Test description' },
      imageUrl: 'https://sitcon.org/2019/static/img/sponsor/hackmd.png',
      point: 11 },
    { isBonus: true,
      significant: 's',
      slug: 'its',
      displayText: { 'zh-TW': '中央研究院資訊服務處', en: '中央研究院資訊服務處' },
      description: { 'zh-TW': '測試敘述', en: 'Test description' },
      imageUrl: 'https://sitcon.org/2019/static/img/sponsor/its.png',
      point: 76 },
    { isBonus: false,
      significant: 's',
      slug: 'cycarrier',
      displayText: { 'zh-TW': '奧義智慧科技', en: '奧義智慧科技' },
      description: { 'zh-TW': '測試敘述', en: 'Test description' },
      imageUrl: 'https://sitcon.org/2019/static/img/sponsor/cycarrier.png',
      point: 38 },
    { isBonus: false,
      significant: 'c',
      slug: 'mozilla',
      displayText: { 'zh-TW': 'Mozilla Taiwan', en: 'Mozilla Taiwan' },
      description: { 'zh-TW': '測試敘述', en: 'Test description' },
      imageUrl: 'https://sitcon.org/2019/static/img/sponsor/mozilla.png',
      point: 29 }
  ]
}

const types = {
  UPDATE_CONFIG: 'UPDATE_CONFIG'
}

const getters = {
  confName: state => state.confName,
  title: state => lang => state.title[lang],
  bingoPatterns: state => state.bingoPatterns,
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
    state.bingoPatterns = data.bingoPatterns
  }
}

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
  types
}
