<template>
  <div>
    <h1>{{ $t('bingo') }}</h1>
    <template v-if="showScanner">
      <qrcode-reader
            :enable="showScanner"
            :noResult="true"
            title=""
            :subTitle="$t('scan_qrcode')"
            @OnSuccess="OnSuccess"
          ></qrcode-reader>
    </template>
    <template v-else>
      <div role="bingo" :style="`--edgeLength: ${edgeLength}`">
        <template v-for="(booth, index) in booths">
          <Chip
            :logoUri="booth.image_url"
            :isActive="userSeal.findIndex(seal => seal.deliver === booth.slug)> -1"
            :key="index"
            />
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import QrcodeReader from '@/components/QrcodeReader.vue'
import Chip from '@/components/Chip.vue'
import bingo from '@/utils/shuffledBingo.js'

export default {
  name: 'Bingo',
  component: {
    Chip,
    QrcodeReader
  },
  data () {
    return {
      booths: [
        {
          significant: 'c',
          slug: 'opass',
          display_text: {
            'zh-TW': 'OPass',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        },
        {
          significant: 's',
          slug: 'opass-sponsor',
          display_text: {
            'zh-TW': 'OPassSponsor',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        },
        {
          significant: 'c',
          slug: 'opass',
          display_text: {
            'zh-TW': 'OPass',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        },
        {
          significant: 's',
          slug: 'opass-sponsor',
          display_text: {
            'zh-TW': 'OPassSponsor',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        },
        {
          significant: 'c',
          slug: 'opass',
          display_text: {
            'zh-TW': 'OPass',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        },
        {
          significant: 's',
          slug: 'opass-sponsor',
          display_text: {
            'zh-TW': 'OPassSponsor',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        },
        {
          significant: 'c',
          slug: 'opass',
          display_text: {
            'zh-TW': 'OPass',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        },
        {
          significant: 's',
          slug: 'opass-sponsor',
          display_text: {
            'zh-TW': 'OPassSponsor',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        },
        {
          significant: 'c',
          slug: 'opass',
          display_text: {
            'zh-TW': 'OPass',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        },
        {
          significant: 's',
          slug: 'opass-sponsor',
          display_text: {
            'zh-TW': 'OPassSponsor',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        },
        {
          significant: 'c',
          slug: 'opass',
          display_text: {
            'zh-TW': 'OPass',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        },
        {
          significant: 's',
          slug: 'opass-sponsor',
          display_text: {
            'zh-TW': 'OPassSponsor',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        },
        {
          significant: 'c',
          slug: 'opass',
          display_text: {
            'zh-TW': 'OPass',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        },
        {
          significant: 's',
          slug: 'opass-sponsor',
          display_text: {
            'zh-TW': 'OPassSponsor',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        },
        {
          significant: 'c',
          slug: 'opass',
          display_text: {
            'zh-TW': 'OPass',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        },
        {
          significant: 's',
          slug: 'opass-sponsor',
          display_text: {
            'zh-TW': 'OPassSponsor',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        },
        {
          significant: 'c',
          slug: 'opass',
          display_text: {
            'zh-TW': 'OPass',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        },
        {
          significant: 's',
          slug: 'opass-sponsor',
          display_text: {
            'zh-TW': 'OPassSponsor',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        },
        {
          significant: 'c',
          slug: 'opass',
          display_text: {
            'zh-TW': 'OPass',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        },
        {
          significant: 's',
          slug: 'opass-sponsor',
          display_text: {
            'zh-TW': 'OPassSponsor',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        },
        {
          significant: 'c',
          slug: 'opass',
          display_text: {
            'zh-TW': 'OPass',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        },
        {
          significant: 's',
          slug: 'opass-sponsor',
          display_text: {
            'zh-TW': 'OPassSponsor',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        },
        {
          significant: 'c',
          slug: 'opass',
          display_text: {
            'zh-TW': 'OPass',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        },
        {
          significant: 's',
          slug: 'opass-sponsor',
          display_text: {
            'zh-TW': 'OPassSponsor',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        },
        {
          significant: 'c',
          slug: 'opass',
          display_text: {
            'zh-TW': 'OPass',
            en: 'OPass'
          },
          image_url: 'https://avatars0.githubusercontent.com/u/24525301?s=200&v=4',
          point: 10
        }
      ],
      showScanner: false,
      token: '852a26c044d71f21761212d609a7970c4df83127',
      userSeal: [
        {
          deliver: 'opass',
          timestamp: 1563645742.220855
        }
      ]
    }
  },
  computed: {
    boothList () {
      return bingo(this.token, this.booths.map(booth => ({
        significant: booth.significant,
        slug: booth.slug,
        display_text: booth.display_text[this.$i18n.locale],
        image_url: booth.image_url,
        point: booth.point
      })))
    },
    edgeLength () {
      return Math.round(Math.sqrt(this.boothList.length, 2))
    }
  },
  mounted () {
    this.loadBoothList()
  },
  methods: {
    loadBoothList () {

    },
    loadUserContext () {

    }
  }
}
</script>

<style lang="stylus">
[role='bingo']
  display: grid
  margin: 0 auto
  grid-template-rows: repeat(var(--edgeLength), auto)
  grid-template-columns: repeat(var(--edgeLength), auto)
  justify-content: center
  align-content: center
  [role='chip']
    max-width: calc(100vh / var(--edgeLength))
    border: 1px dashed rgba(0, 0, 0, 0.4)
    border-radius: 5px
    line-height: 1
    img
      display: inline-block
      vertical-align: middle
      margin: 0
      padding: 0
      width: 100%
      height: 100%
</style>
