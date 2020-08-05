<template>
  <div role="stamp">
    <h1 role="title">攤位蓋章機</h1>
    <template v-if="boothToken !== null && slug !== null">
      <div role="booth-info">
        <div role="booth-logo">
          <img :src="boothProfile.imageUrl" alt="">
        </div>
        <div role="booth-displayText">
          <h3>{{ $t('login_as')}}</h3>
          <h1>{{ boothProfile.displayText[$i18n.locale] }}</h1>
        </div>
      </div>
    </template>
    <h6 role="detected" class="ma-0" v-if="playerToken">{{ $t('detected_qrcode_value_is', { value: playerToken.slice(0, 10) + playerToken.slice(10).replace(/[a-z0-9]/g, '*') }) }}</h6>
    <qrcode-reader
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
import axios from '@/utils/http.js'
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
      if (newValue === null) return
      this.message = `Processing`
      if (newValue !== oldValue) {
        try {
          this.slug = await apiClient.booth.getSlugByToken(this.boothToken)
        } catch (e) {
          const { response: { data: { message } } } = e
          this.message = this.$t(message)
          this.toggleSnackbar()
        }
      }
    },
    async playerToken (newValue, oldValue) {
      if (newValue === null) return
      this.message = `Processing`
      this.toggleSnackbar()
      try {
        await apiClient.booth.sendReward2Player(this.boothToken, this.playerToken)
        const { data: { nickname: nickName } } = await axios.get(`landing?token=${this.playerToken}`)
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
      }.bind(this), 10000)
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
  [role="detected"]
    text-align: center
  [role="stampScanner"]
    margin: 1em auto
  [role="booth-info"]
    display: grid
    grid-template-columns: max-content 1fr
    grid-template-rows: 1fr 3fr
    grid-gap: 5px
    grid-template-areas: "logo displayText" "logo displayText"
    padding: 1em
    margin: 1em auto
    background: #fff
    border-style: solid
    border-color: #fff
    border-radius: 5px
    max-width: max-content
  [role="booth-displayText"]
    text-align: center
    grid-area: displayText
    align-self: center
    h1
      margin: 0 auto
    h3
      margin: 0 auto 30px auto
  [role="booth-logo"]
    grid-area: logo
    align-self: center
    img
      max-width: 200px
      max-height: 150px
</style>
