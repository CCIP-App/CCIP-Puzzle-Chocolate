<template>
  <div id="QRScanner">
  <center>
      <h2 class="ma-0" v-if=" title != '' ">{{ title }}</h2>
      <p role="subTitle" v-if="subTitle !== '' ">{{ subTitle }}</p>
      <div v-if="!isWebRTCSupported">
        <p>連 iOS 都支援 WebRTC 了，您是不是該換裝置了呢？</p>
      </div>
      <template v-else>
        <div v-show="enable">
          <video ref="preview" :width="previewWidth" autoplay playsinline></video>
        </div>
        <div v-show="!enable">
        <button id="enableButton" class="OpenCamera" @click="startScanner"></button>
      </div>
      </template>
      <h6 class="ma-0" v-if=" !noResult ">{{ result }}</h6>
    </center>
  </div>
</template>

<script>
import QrScanner from 'qr-scanner'
import _ from 'lodash'

export default {
  name: 'QRScanner',
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
      result: 'Loading...',
      scanner: null,
      previewWidth: null,
      enable: false
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
  watch: {
    result (newValue) {
      if (newValue === null) return
      this.emitResult(this, newValue)
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
    },
    emitResult: _.debounce((that, newValue) => {
      if (that.isIOS) {
        that.disableScanner()
      }
      that.result = null
      that.$emit('success', newValue)
    }, 100),
    startScanner () {
      if (this.isWebRTCSupported) {
        this.enable = true

        QrScanner.WORKER_PATH = 'js/qr-scanner-worker.min.js'
        this.scanner = new QrScanner(this.$refs.preview, this.scannerCallback)
        this.scanner.setInversionMode('both')
        this.setPreviewSize()
        this.scanner.start()
      }
    },
    setPreviewSize () {
      const width = window.innerWidth
      this.previewWidth = (this.width || Math.round(width * 0.8)) + 'px'
    },
    disableScanner () {
      if (this.scanner) {
        this.enable = false
        this.scanner.destroy()
        this.scanner = null
      }
    }
  },
  beforeDestroy () {
    this.disableScanner()
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
</style>
