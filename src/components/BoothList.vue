<template>
  <div role="boothList">
    <template v-for="(booth, index) in booths">
      <div role="booth" :key="index" :id="booth.slug">
        <div role="logo"><img :src="booth.imageUrl"></div>
        <div role="description">
          <h1>{{ booth.displayText[$i18n.locale] }}</h1>
          <p>{{ booth.description[$i18n.locale] }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'BoothList',
  props: {
    booths: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="stylus">
  [role="boothList"]
    margin: 1rem auto
    max-width: calc(100vw - 2rem)
  [role="booth"]
    display: flex
    flex-direction: row
    background: #fff
    margin: 1rem 0
    padding: 1em
    border-radius: 15px
    @media screen and (max-width: 720px)
      align-items: center

    [role="logo"]
      width: 25%

      img
        display: block
        margin: auto
        max-width: 100%
        max-height: calc(25vw/4*3)
    [role="description"]
      width: calc(75% - 1em)
      margin-left: 1em
      text-align: left

      p
        margin: 0
      h1
        margin: 0 0 .5em 0
        font-size: 16pt

        @media screen and (max-width: 720px)
          font-size: 14pt

</style>
