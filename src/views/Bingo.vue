<template>
  <div role="bingo">
    <h1 role="GameName">{{ $t('bingo') }}</h1>
    <h2 role="bingos" v-if="playerPubToken">{{ $t('has_bingos', { bingos: bingos.toString() }) }}</h2>
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
    <template v-if="playerPubToken !== null && isConfigurationCorrect">
      <SquareGrid :booths="boothList" :userStamps="stamps" :showAnchor="true" />
      <BoothList :booths="booths" />
    </template>
    <template v-if="!isConfigurationCorrect">
      <div role="bingoPatternWrong">
        <p>{{ $t('Game configuration is not correct') }}</p>
      </div>
    </template>
    <Snackbar :isActive="showSnackbar">
      {{ message }}
    </Snackbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import bingoShuffler from '@/utils/shuffledBingo.js'

export default {
  name: 'Bingo',
  data () {
    return {
      showSnackbar: false,
      message: null
    }
  },
  computed: {
    ...mapGetters(['booths', 'bingoPattern', 'stamps', 'playerPubToken']),
    isConfigurationCorrect () {
      const matchedSignificant = this.bingoPattern
        .split('')
        .reduce((counter, pattern) => {
          const target = counter.find(p => p.pattern === pattern)
          if (target) {
            target.count += 1
          } else {
            counter.push({ pattern, count: 1 })
          }
          return counter
        }, [])
        .map((pattern) => Object.assign(pattern, { matched: this.booths.filter(booth => booth.significant === pattern.pattern).length }))

      let isBoothLacking = false
      let isBoothMaybeMissingOnBingo = false
      matchedSignificant.forEach(pattern => {
        if (pattern.pattern !== '0') {
          isBoothLacking = pattern.count > pattern.matched && isBoothLacking
          isBoothMaybeMissingOnBingo = pattern.count < pattern.matched && isBoothMaybeMissingOnBingo
        }
      })

      if (isBoothMaybeMissingOnBingo) {
        console.warn('Some booth will missing on bingo table for some player, see situation 3, case 2, issue #2. https://github.com/CCIP-App/CCIP-Puzzle-Chocolate/issues/2')
      }

      return this.bingoPattern.length > 0 &&
        this.isSquareNumber(this.bingoPattern.length) === true &&
        isBoothLacking === false
    },
    showScanner () {
      return this.playerPubToken === null && this.isConfigurationCorrect
    },
    boothList () {
      if (this.isConfigurationCorrect === false) {
        return []
      }
      const shuffled = bingoShuffler(this.bingoPattern)(
        this.playerPubToken || '',
        this.booths.map(booth => ({
          isBonus: booth.isBonus,
          significant: booth.significant,
          slug: booth.slug,
          displayText: booth.displayText[this.$i18n.locale],
          imageUrl: booth.imageUrl,
          point: booth.point
        }))
      )
      return shuffled
    },
    bingos () {
      const itemNum = this.boothList.length
      const edgeL = Math.ceil(Math.sqrt(this.boothList.length, 2))
      let bingosIndex = []

      // Horizontal
      const horizontal = _.chunk(
        Array(itemNum)
          .fill(0)
          .map((_, i) => i),
        edgeL
      )
      bingosIndex = bingosIndex.concat(horizontal)

      // Vertical
      const vertical = Array(edgeL)
        .fill(Array(edgeL).fill(0))
        .map((row, rowI) => row.map((_, colI) => colI * edgeL + rowI))
      bingosIndex = bingosIndex.concat(vertical)

      // Diagonal
      const RTLB = Array(edgeL)
        .fill(0)
        .map((_, i) => i + i * edgeL)
      const LTRB = Array(edgeL)
        .fill(0)
        .map((_, i) => (i + 1) * (edgeL - 1))
      bingosIndex = bingosIndex.concat([RTLB], [LTRB])

      const lines = bingosIndex.map(bingoLine =>
        bingoLine.map(index => ({
          slug: this.boothList[index].slug,
          isBonus: this.boothList[index].isBonus
        }))
      )

      const userDeliverers = this.stamps.map(deliverer => deliverer.deliverer)

      return lines.filter(line =>
        line.reduce(
          (pv, stamp) =>
            (userDeliverers.findIndex(
              userDeliver => userDeliver === stamp.slug
            ) > -1 ||
              stamp.isBonus) &&
            pv,
          true
        )
      ).length
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
    isSquareNumber (number) {
      return number % Math.sqrt(number, 2) === 0
    },
    onScanSuccess (scanValue) {
      this.$store.dispatch('setPubTokenFromToken', scanValue)
      this.$store.dispatch('fetchPuzzleBook')
    },
    onScanFail (errorMessage) {
      this.message = this.$t('qrcode_scan_fail')
      this.toggleSnackbar()
    },
    toggleSnackbar () {
      this.showSnackbar = true
      setTimeout(function () {
        this.showSnackbar = false
      }.bind(this), 5000)
    }
  }
}
</script>

<style lang="stylus">
[role='bingos']
  text-align: center
[role='bingoPatternWrong']
  text-align: center
</style>
