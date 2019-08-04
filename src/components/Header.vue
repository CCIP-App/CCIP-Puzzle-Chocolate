<template>
  <div role="header">
    {{ confName }} × OPass
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapGetters(['confName'])
  }
}
</script>

<style lang="stylus">
  [role="header"]
    text-align: center
    padding: 1rem 0
    color: #fff
    font-size: 26pt
    font-weight: 1000
    background-image: linear-gradient(243deg, #67328c, #643189 3%, #532875 25%, #170a31);
</style>
