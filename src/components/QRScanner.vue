<template>
  <div id="QRScanner">
  <center>
      <h2 class="ma-0" v-if=" title != '' ">{{ title }}</h2>
      <p role="subTitle" v-if="subTitle !== '' ">{{ subTitle }}</p>
      <h6 class="ma-0" v-if=" !noResult " role="result">{{ result }}</h6>
      <div v-if="!isWebRTCSupported">
        <p>連 iOS 都支援 WebRTC 了，您是不是該換裝置了呢？</p>
      </div>
      <template v-else>
        <div :style="{width:previewWidth}" v-show="enable">
          <qrcode-stream @decode="scannerCallback"></qrcode-stream>
        </div>
        <div v-show="!enable">
          <button id="enableButton" class="OpenCamera" @click="startScanner"></button>
        </div>
      </template>
    </center>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  name: 'QRScanner',
  components: { QrcodeStream },
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    show: Boolean,
    noResult: Boolean,
    width: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      previewWidth: null,
      enable: false,
      result: null
    }
  },
  computed: {
    isWebRTCSupported () {
      if (navigator.mediaDevices) {
        return true
      }
      return false
    },
    isIOS () {
      return window.navigator.userAgent.match(/iPhone|iPad|iPod/i)
    }
  },
  mounted () {
    if (!this.isIOS) {
      this.startScanner()
    }
  },
  methods: {
    scannerCallback (result) {
      this.result = result
      this.$emit('success', result)
      let oldValue = result
      setTimeout(_ => {
        if (oldValue === this.result) {
          this.result = ''
        }
      }, 5000)
    },
    startScanner () {
      if (this.isWebRTCSupported) {
        this.enable = true
        this.setPreviewSize()
      }
    },
    setPreviewSize () {
      const width = window.innerWidth
      const height = window.innerHeight
      const aspect = width / height
      if (width > height) {
        if (width >= 1280) {
          this.previewWidth = (Math.min(Math.round((height - 420) * aspect), 1280)) + 'px'
        } else {
          this.previewWidth = (this.width || Math.round(width * 0.8)) + 'px'
        }
      } else {
        if (width <= 576) {
          this.previewWidth = (Math.round(height * 0.8 * aspect)) + 'px'
        } else {
          this.previewWidth = (Math.round(height * 0.4 * aspect)) + 'px'
        }
      }
    }
  }
}
</script>

<style lang="stylus">
  .OpenCamera
    @media screen and (max-width: 454px) // must bigger than 454px for two column
      min-height: 150px
    background: url('../assets/opencam.png')
    background-size: cover
    background-repeat: no-repeat
    background-position: center

  #enableButton
    min-height: 250px
    max-height: 50vw
    min-width: 250px
    max-width: 50vw
    border: none

  [role="subTitle"]
    margin-bottom: 3rem

  [role="result"]
    font-size: 1rem
</style>
