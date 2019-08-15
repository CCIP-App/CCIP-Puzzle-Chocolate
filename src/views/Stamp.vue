<template>
  <div role="stamp">
    <h1 role="title">攤位蓋章機</h1>
    <template v-if="boothToken !== null && slug !== null">
      <div role="booth-info">
        <h1 role="booth-displayText">已登入為</h1>
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
        @error="onScanFail"
        role="stampScanner"
      ></qrcode-reader>
    <Snackbar :isActive="showSnackbar">
      {{ message }}
    </Snackbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import apiClient from '@/utils/apiClient.js'
import { setTimeout } from 'timers'
export default {
  name: 'Stamp',
  data () {
    return {
      boothToken: null,
      slug: null,
      playerToken: null,
      showSnackbar: false,
      message: ''
    }
  },
  computed: {
    ...mapGetters(['booth']),
    boothProfile () {
      return (this.slug && this.booth(this.slug)) || null
    }
  },
  watch: {
    async boothToken (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.slug = await apiClient.booth.getSlugByToken(this.boothToken)
      }
    },
    async playerToken (newValue, oldValue) {
      if (newValue === null) return
      this.message = `Processing`
      this.toggleSnackbar()
      try {
        await apiClient.booth.sendReward2Player(this.boothToken, this.playerToken)
        const { data: nickName } = await apiClient.get(`landing?token=${this.playerToken}`)
        this.message = this.$t('sendRewardSuccess', { playerName: nickName, gameReward: this.$t('_stamp') })
      } catch (e) {
        const { response: { data: { message } } } = e
        this.message = this.$t(message)
      }

      this.toggleSnackbar()
    }
  },
  created () {
    this.$store.dispatch('fetchGameConfig')
  },
  mounted () {
    this.boothToken = this.$route.query.token || null
  },
  methods: {
    async onScanSuccess (value) {
      if (this.boothToken === null || this.boothProfile === null) {
        this.boothToken = value
      } else if (value !== this.boothToken) {
        this.playerToken = value
      }
    },
    toggleSnackbar () {
      this.showSnackbar = true
      setTimeout(function () {
        this.showSnackbar = false
        this.playerToken = null
      }.bind(this), 5000)
    },
    onScanFail (errorMessage) {
      this.message = this.$t('qrcode_scan_fail')
      this.toggleSnackbar()
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
    max-width: 320px
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
</style>
