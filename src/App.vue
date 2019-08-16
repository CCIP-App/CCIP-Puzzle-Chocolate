<template>
  <div id="app">
    <Header />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    const language = (navigator.languages[0] || navigator.language || navigator.browserLanguage).toLowerCase()
    if (!language.includes('zh')) {
      this.$i18n.locale = 'en'
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0px;
}
</style>

<style lang="stylus">
  @import './stylus/main'
</style>
