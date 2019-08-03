<template>
  <div role="squareGrid" :style="`--edgeLength: ${edgeLength}`">
    <template v-for="(booth, index) in booths">
      <Chip
        :logoUri="booth.image_url"
        :isActive="userSeals.findIndex(seal => seal.deliver === booth.slug)> -1"
        :key="index"
      />
    </template>
  </div>
</template>

<script>
import Chip from '@/components/Chip.vue'
export default {
  name: 'SquareGrid',
  props: {
    booths: {
      type: Array,
      default: () => []
    },
    userSeals: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Chip
  },
  computed: {
    edgeLength () {
      return Math.sqrt(this.booths.length, 2)
    }
  }
}
</script>

<style lang="stylus">
[role='squareGrid']
  display: grid
  margin: 0 auto
  grid-template-rows: repeat(var(--edgeLength), auto)
  grid-template-columns: repeat(var(--edgeLength), auto)
  justify-content: center
  align-content: center

  [role='chip']
    border: 1px dashed rgba(0, 0, 0, 0.4)
    line-height: 1
    background: #fff
    display: flex
    align-items: center
    width: calc((100vw / var(--edgeLength) - 5px))
    height: calc((100vw / var(--edgeLength) - 5px))

    @media screen and (min-width: 720px)
      width: calc((100vw / var(--edgeLength) - 1rem))
      height: calc((100vw / var(--edgeLength) - 1rem))

    img
      display: inline-block
      margin: auto 0
      padding: 0
      width: 100%
      height: auto
</style>
