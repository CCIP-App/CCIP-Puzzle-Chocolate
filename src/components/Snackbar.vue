<template>
  <div role="snackbar" :class="{ active: isActive }">
    <div class="wrapper"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'Snackbar',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus">
  [role="snackbar"]
    z-index 1000
    position fixed
    color #fff
    display block
    background-color #323232
    border-radius 5px
    left 1em
    bottom 5em
    opacity 0

    // mobile phone
    @media screen and (orientation: portrait)
      left 0
      right 0
      width 80vw
      margin 0 auto

    // tablet or desktop
    @media screen and (min-width: 720px)
      min-width 344px

    &.active
      opacity 1

    .wrapper
      width 100%
      padding 9px 16px
      min-height 48px
      display inline-flex
      align-items center
</style>
