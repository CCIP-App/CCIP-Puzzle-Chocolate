<template>
  <div id="Footer">
    <div class="content">
      {{confName}} × OPass | Fork on
      <a href="https://github.com/CCIP-App/CCIP-Puzzle-Chocolate/" target="_blank" alt="Source code on GitHub">GitHub</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Footer',
  computed: {
    ...mapGetters(['confName'])
  }
}
</script>

<style lang="stylus">
#Footer
  display: flex
  justify-content: center
  align-items: flex-end
  flex-grow: 1
  .content
    padding: 2em
  .fillet-label
    background-color: rgba(0, 0, 0, .5)
</style>
