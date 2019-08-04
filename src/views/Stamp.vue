<template>
  <div role="stamp">
    <h1 role="title">攤位蓋章機</h1>
    <template v-if="boothToken !== null && slug !== null">
      <div role="booth-info">
        <div role="booth-logo">
          <img :src="boothProfile.imageUrl" alt="">
        </div>
        <h1 role="booth-displayText">{{ boothProfile.displayText[$i18n.locale] }}</h1>
      </div>
    </template>
    <qrcode-reader
        :enable="true"
        :noResult="true"
        @success="onScanSuccess"
        role="stampScanner"
      ></qrcode-reader>
    <div role="information">

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import apiClient from '@/utils/apiClient.js'
export default {
  name: 'Stamp',
  data () {
    return {
      boothToken: null,
      slug: null,
      playerToken: null
    }
  },
  computed: {
    ...mapGetters(['booth']),
    boothProfile () {
      return (this.slug && this.booth(this.slug)) || null
    }
  },
  mounted () {
    this.boothToken = this.$route.query.token || null
  },
  methods: {
    async onScanSuccess (value) {
      if (this.boothToken === null) {
        this.boothToken = value
        this.slug = await apiClient.booth.getSlugByToken(this.boothToken)
      } else if (value !== this.boothToken) {
        this.playerToken = value
      }
    }
  }
}
</script>

<style lang="stylus">
  [role="title"]
    text-align: center
  [role="stampScanner"]
    margin: 1em auto
  [role="booth-info"]
    padding: 1em
    margin: 1em auto
    background: #fff
    border-style: solid
    border-color: #fff
    border-radius: 5px
    width: 50vw
  [role="booth-displayText"]
    margin: 0 auto
    text-align: center
  [role="booth-logo"]
    display: flex
    justify-content: center
    margin-bottom: 1em
    img
      max-width: 200px
      max-height: 150px
  [role="information"]
    position: absolute
    bottom: 0
    width: 100vw
    min-height: 100px
    & .info
      background: #67328c
</style>
