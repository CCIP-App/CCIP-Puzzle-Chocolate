<template>
  <div role="chip" :class="{ active: isActive }">
    <img :src="logourl">
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
