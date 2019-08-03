<template>
  <div role="fragments">
    <template v-for="(puzzle, index) in fragments">
      <div role="puzzle" :key="index">
        <div role="puzzle-name">
          <span>{{ puzzle.puzzle }}</span>
        </div>
        <div role="puzzle-count">
          <span>{{ puzzle.count }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'FragmentList',
  props: {
    fragments: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="stylus">
[role="fragments"]
    display: flex
    flex-wrap: wrap
    margin: 1rem auto
    max-width: calc(100vw - 2rem)
    align-items: stretch
    align-content: center

    [role="puzzle"]
      margin: 1rem
      background: #fff
      border-style: solid
      border-radius: 15px
      border-color: #fff
      flex-grow: 1
      width: calc((100vw - 5rem) / 4)
      min-width: 125px
      height: calc(((100vw - 5rem) / 4) / 2.5)
      min-height: 100px
      @media screen and (min-width: 720px)
        max-width: 300px
        max-height: 120px

    [role="puzzle-name"]
      display: table
      font-size: 18pt
      font-weight: 500
      height: 100%
      width: 100%

    [role="puzzle-count"]
      position: relative
      margin-right: -15px
      margin-left: auto
      margin-top: -30px
      display: table
      font-weight: 500
      font-size: 16pt
      line-height: 16pt
      width: 40px
      height: 40px
      color: #fff
      border-style: solid
      border-radius: 50%
      border-color: #67328c
      background-image: linear-gradient(243deg, #67328c, #643189 3%, #532875 25%, #170a31);
    span
      text-align: center
      display: table-cell
      vertical-align: middle
</style>
