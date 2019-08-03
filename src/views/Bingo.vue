<template>
  <div>
    <h1>{{ $t('bingo') }}</h1>
    <template v-if="showScanner">
      <qrcode-reader
        :enable="showScanner"
        :noResult="true"
        title
        :subTitle="$t('scan_qrcode')"
        @OnSuccess="OnSuccess"
      ></qrcode-reader>
    </template>
    <template v-else>
      <SquareGrid :booths="boothList" :userSeals="userSeals" />
    </template>
  </div>
</template>

<script>
import QrcodeReader from '@/components/QrcodeReader.vue'
import SquareGrid from '@/components/SquareGrid.vue'
import bingoShuffler from '@/utils/shuffledBingo.js'

export default {
  name: 'Bingo',
  components: {
    SquareGrid,
    QrcodeReader
  },
  data () {
    return {
      booths: [ { isBonus: false,
        significant: 'c',
        slug: 'sitcon',
        displayText: { 'zh-TW': 'SITCON 學生計算機年會籌備團隊', en: 'SITCON 學生計算機年會籌備團隊' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/sitcon.png',
        point: 48 },
      { isBonus: false,
        significant: 'c',
        slug: 'iis',
        displayText: { 'zh-TW': '中央研究院資訊科學研究所', en: '中央研究院資訊科學研究所' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/iis.png',
        point: 50 },
      { isBonus: true,
        significant: 's',
        slug: 'ocf',
        displayText: { 'zh-TW': '財團法人開放文化基金會', en: '財團法人開放文化基金會' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/ocf.png',
        point: 5 },
      { isBonus: true,
        significant: 'c',
        slug: 'itsa',
        displayText:
     { 'zh-TW': '教育部資通訊軟體創新人才推升計畫推動中心', en: '教育部資通訊軟體創新人才推升計畫推動中心' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/itsa.png',
        point: 35 },
      { isBonus: true,
        significant: 's',
        slug: 'holistic',
        displayText: { 'zh-TW': '好苙整合設計', en: '好苙整合設計' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/hoholistic.png',
        point: 35 },
      { isBonus: true,
        significant: 's',
        slug: 'klickklack',
        displayText: { 'zh-TW': 'KlickKlack', en: 'KlickKlack' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/klickklack.png',
        point: 58 },
      { isBonus: false,
        significant: 's',
        slug: 'archilife',
        displayText: { 'zh-TW': '祐生研究基金會', en: '祐生研究基金會' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/archilife.png',
        point: 87 },
      { isBonus: true,
        significant: 's',
        slug: 'skymizer',
        displayText: { 'zh-TW': 'Skymizer', en: 'Skymizer' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/skymizer.png',
        point: 94 },
      { isBonus: true,
        significant: 'c',
        slug: 'hkcota',
        displayText: { 'zh-TW': '香港開放創意科技協會', en: '香港開放創意科技協會' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/hkcota.png',
        point: 34 },
      { isBonus: true,
        significant: 'c',
        slug: 'tezos',
        displayText:
     { 'zh-TW': 'Tezos Southeast Asia', en: 'Tezos Southeast Asia' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/tezos.png',
        point: 8 },
      { isBonus: false,
        significant: 'c',
        slug: 'twnic',
        displayText: { 'zh-TW': '財團法人台灣網路資訊中心', en: '財團法人台灣網路資訊中心' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/twnic.png',
        point: 26 },
      { isBonus: true,
        significant: 's',
        slug: 'coscup',
        displayText: { 'zh-TW': 'COSCUP', en: 'COSCUP' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/coscup.png',
        point: 99 },
      { isBonus: true,
        significant: 's',
        slug: 'iii',
        displayText: { 'zh-TW': '資策會數位轉型研究所', en: '資策會數位轉型研究所' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/iii.png',
        point: 26 },
      { isBonus: false,
        significant: 's',
        slug: 'datarget',
        displayText: { 'zh-TW': '創代科技股份有限公司', en: '創代科技股份有限公司' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/datarget.png',
        point: 60 },
      { isBonus: true,
        significant: 'c',
        slug: 'microsoft',
        displayText: { 'zh-TW': 'Microsoft Taiwan', en: 'Microsoft Taiwan' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/microsoft.png',
        point: 78 },
      { isBonus: false,
        significant: 's',
        slug: '104',
        displayText: { 'zh-TW': '一零四資訊科技', en: '一零四資訊科技' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/104.png',
        point: 95 },
      { isBonus: false,
        significant: 's',
        slug: 'dcard',
        displayText: { 'zh-TW': 'Dcard 狄卡科技', en: 'Dcard 狄卡科技' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/dcard.png',
        point: 96 },
      { isBonus: true,
        significant: 's',
        slug: 'connectjob',
        displayText: { 'zh-TW': 'Connect Job Agent', en: 'Connect Job Agent' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/connectjob.png',
        point: 75 },
      { isBonus: false,
        significant: 'c',
        slug: 'kkbox',
        displayText: { 'zh-TW': 'KKBOX', en: 'KKBOX' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/kkbox.png',
        point: 19 },
      { isBonus: true,
        significant: 'c',
        slug: 'twchacker',
        displayText:
     { 'zh-TW': '社團法人臺灣校園資訊安全推廣暨駭客培育協會',
       en: '社團法人臺灣校園資訊安全推廣暨駭客培育協會' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/twchacker.png',
        point: 0 },
      { isBonus: true,
        significant: 's',
        slug: 'advantech',
        displayText: { 'zh-TW': '研華科技物聯網開發者大賽', en: '研華科技物聯網開發者大賽' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/advantech.png',
        point: 91 },
      { isBonus: false,
        significant: 'c',
        slug: 'hackmd',
        displayText: { 'zh-TW': 'HackMD', en: 'HackMD' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/hackmd.png',
        point: 36 },
      { isBonus: false,
        significant: 'c',
        slug: 'its',
        displayText: { 'zh-TW': '中央研究院資訊服務處', en: '中央研究院資訊服務處' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/its.png',
        point: 52 },
      { isBonus: false,
        significant: 'c',
        slug: 'cycarrier',
        displayText: { 'zh-TW': '奧義智慧科技', en: '奧義智慧科技' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/cycarrier.png',
        point: 29 },
      { isBonus: false,
        significant: 'c',
        slug: 'mozilla',
        displayText: { 'zh-TW': 'Mozilla Taiwan', en: 'Mozilla Taiwan' },
        image_url: 'https://sitcon.org/2019/static/img/sponsor/mozilla.png',
        point: 15 },
      { isBonus: true,
        significant: 'o',
        slug: 'opass',
        displayText: { 'zh-TW': 'OPass', en: 'OPass' },
        image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
        point: 15 } ],
      showScanner: false,
      token: '5692e019b37d6a4ebc9969a1e10397fb72761e52',
      userSeals: [
        {
          deliver: 'opass',
          timestamp: 1563645742.220855
        }
      ]
    }
  },
  created () {
    // Check config is valid
  },
  computed: {
    boothList () {
      const shuffled = bingoShuffler(
        this.token,
        this.booths.map(booth => ({
          isBonus: booth.isBonus,
          significant: booth.significant,
          slug: booth.slug,
          displayText: booth.displayText[this.$i18n.locale],
          image_url: booth.image_url,
          point: booth.point
        }))
      )
      return shuffled
    }
  },
  mounted () {
    this.loadBoothList()
  },
  methods: {
    loadBoothList () {},
    loadUserContext () {}
  }
}
</script>

<style lang="stylus">
</style>
