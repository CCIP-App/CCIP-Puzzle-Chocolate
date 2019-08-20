<template>
  <div role="chip" :class="{ active: isActive }">
    <img role="logo" :src="logourl" :alt="displayName">
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
[role="chip"]
  position relative
  [role="stampImg"]
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    img
      width: calc(((100vw - 2rem) / var(--edgeLength)) / 2 * 1.5) !important

</style>
