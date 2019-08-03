<template>
  <div>
    <h1>{{ $t('reward') }}</h1>
    <h2>{{ $t('has_got_points', {points: gotPoints}) }}</h2>
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
      <div role="chips">
        <template v-for="(booth, index) in booths">
          <Chip :logoUri="booth.image_url" :isActive="userSeal.findIndex(seal => seal.deliver === booth.slug)> -1" :key="index" />
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import QrcodeReader from '@/components/QrcodeReader.vue'
import Chip from '@/components/Chip.vue'

export default {
  name: 'Reward',
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
        }
      ],
      showScanner: false,
      token: null,
      userSeal: [
        {
          deliver: 'opass',
          timestamp: 1563645742.220855
        }
      ]
    }
  },
  computed: {
    boothList: () => (this.booths.map(booth => ({
      significant: booth.significant,
      slug: booth.slug,
      display_text: booth.display_text[this.$i18n.locale],
      image_url: booth.image_url,
      point: booth.point
    }))),
    gotPoints () {
      return this.userSeal.reduce((gotPoints, seal) => {
        const deliver = this.booths.find((booth) => booth.slug === seal.deliver)
        return deliver && deliver.point ? gotPoints + deliver.point : gotPoints
      }, 0)
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

</style>
