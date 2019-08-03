<template>
  <div role="squareGrid" :style="`--edgeLength: ${edgeLength}`">
    <template v-for="(booth, index) in booths">
      <template v-if="showAnchor && booth.slug">
        <a :href="`#${booth.slug}`" :key="index">
          <Chip
            :logoUri="booth.image_url"
            :isActive="userSeals.findIndex(seal => seal.deliver === booth.slug)> -1"
          />
        </a>
      </template>
      <template v-else>
        <Chip
          :logoUri="booth.image_url"
          :isActive="userSeals.findIndex(seal => seal.deliver === booth.slug)> -1"
          :key="index"
        />
      </template>
    </template>
  </div>
</template>

<script>
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
    },
    showAnchor: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    edgeLength () {
      return Math.ceil(Math.sqrt(this.booths.length, 2))
    }
  }
}
</script>

<style lang="stylus">
[role='squareGrid']
  display: grid
  margin: 1rem auto
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
    width: calc(((100vw - 2rem) / var(--edgeLength)))
    height: calc(((100vw - 2rem) / var(--edgeLength)))

    img
      display: inline-block
      margin: auto 0
      padding: 0
      width: 100%
      height: auto
</style>
