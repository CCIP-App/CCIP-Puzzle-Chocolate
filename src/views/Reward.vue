<template>
  <div role="reward">
    <h1 role="GameName">{{ $t('reward') }}</h1>
    <template v-if="showScanner">
      <qrcode-reader
        :enable="showScanner"
        :noResult="true"
        title
        :subTitle="$t('scan_qrcode')"
        @success="onScanSuccess"
        @error="onScanFail"
      ></qrcode-reader>
    </template>
    <template v-if="playerPubToken !== null">
      <h2 role="got-points">{{ $t('has_got_points', {points: gotPoints}) }}</h2>
      <SquareGrid :booths="boothList" :userStamps="stamps" :showAnchor="true" />
      <BoothList :booths="booths" />
    </template>
    <Snackbar :isActive="showErrorMessage">
      {{ errorMessage }}
      <template v-if="stamps.length === 0">
        <button role="retry" @click="retryScanner">Retry</button>
      </template>
    </Snackbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Reward',
  computed: {
    ...mapGetters(['booths', 'stamps', 'playerPubToken', 'errorMessage', 'showErrorMessage']),
    showScanner () {
      return this.playerPubToken === null
    },
    boothList () {
      let booths = this.booths.map(booth => ({
        isBonus: booth.isBonus,
        significant: booth.significant,
        slug: booth.slug,
        displayText: booth.displayText[this.$i18n.locale],
        imageUrl: booth.imageUrl,
        point: booth.point
      }))

      let edge = Math.ceil(Math.sqrt(booths.length, 2))
      let spaceNum = edge - (booths.length % edge) || 0

      return booths.concat(
        Array(spaceNum).fill({
          isBonus: false,
          significant: null,
          slug: null,
          displayText: null,
          imageUrl: null,
          point: 0
        })
      )
    },
    gotPoints () {
      return (
        this.booths
          .filter(booth => booth.isBonus)
          .reduce((gotPoint, booth) => gotPoint + booth.point, 0) +
        this.stamps.reduce((gotPoints, stamp) => {
          const deliverer = this.booths.find(
            booth => booth.slug === stamp.deliverer && booth.isBonus === false
          )
          return deliverer && deliverer.point
            ? gotPoints + deliverer.point
            : gotPoints
        }, 0)
      )
    }
  },
  created () {
    this.$store.dispatch('fetchGameConfig')
    const token = this.$route.query.token || null
    if (token !== null) {
      this.$store.dispatch('setPubToken', token)
      this.$store.dispatch('fetchPuzzleBook')
    }
  },
  methods: {
    onScanSuccess (scanValue) {
      this.$store.dispatch('setPubTokenFromToken', scanValue)
      this.$store.dispatch('fetchPuzzleBook')
    },
    toggleSnackbar () {
      this.$store.dispatch('showErrorMessage')
    },
    onScanFail (errorMessage) {
      this.$store.dispatch('setErrorMessage', this.$t('qrcode_scan_fail'))
      this.toggleSnackbar()
    },
    retryScanner () {
      this.$store.dispatch('setPubToken', null)
      this.toggleSnackbar()
    }
  }
}
</script>

<style lang="stylus">
[role='got-points']
  text-align: center
[role="retry"]
  text-align right
  margin-right 0
  margin-left auto
  border none
  background transparent
  text-decoration underline
  color rgb(91.7%, 91.7%, 2.1%)
  font-weight 500
</style>
