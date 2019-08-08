<template>
  <div role="chip" :class="{ active: isActive }">
    <img role="logo" :src="logourl">
    <div role="stampImg">
      <img src="@/assets/OPASS-pass-stamp.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chip',
  props: {
    displayName: {
      type: String,
      default: ''
    },
    logoUri: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    logourl () {
      return this.logoUri
    }
  }
}
</script>

<style lang="stylus">
  [role="stampImg"]
    overflow: hidden
    margin: -50% calc(-100% * 7 / 8 )
    img
      width: calc(((100vw - 2rem) / var(--edgeLength)) / 2 * 1.5) !important

</style>
