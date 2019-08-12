<template>
  <div role="bingo">
    <h1 role="GameName">{{ $t('bingo') }}</h1>
    <h2 role="bingos">{{ $t('has_bingos', { bingos: bingos.toString() }) }}</h2>
    <template v-if="showScanner">
      <qrcode-reader
        :enable="showScanner"
        :noResult="true"
        title
        :subTitle="$t('scan_qrcode')"
        @success="onScanSuccess"
      ></qrcode-reader>
    </template>
    <template v-if="playerPubToken !== null">
      <SquareGrid :booths="boothList" :userStamps="stamps" :showAnchor="true" />
      <BoothList :booths="booths" />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import bingoShuffler from '@/utils/shuffledBingo.js'

export default {
  name: 'Bingo',
  computed: {
    ...mapGetters(['booths', 'bingoPatterns', 'stamps', 'playerPubToken']),
    showScanner () {
      return this.playerPubToken === null
    },
    boothList () {
      const shuffled = bingoShuffler(this.bingoPatterns)(
        this.playerPubToken,
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
    this.$store.dispatch('fetchBooths')
    const token = this.$route.query.token || null
    if (token !== null) {
      this.$store.dispatch('setPubTokenFromToken', token)
      this.$store.dispatch('fetchPuzzleBook')
    }
  },
  methods: {
    onScanSuccess (scanValue) {
      this.$store.dispatch('setPubTokenFromToken', scanValue)
      this.$store.dispatch('fetchPuzzleBook')
    }
  }
}
</script>

<style lang="stylus">
[role='bingos'] {
  text-align: center;
}
</style>
