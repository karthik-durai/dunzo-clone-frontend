<template>
  <div>
    <search-location
      v-on:coords="getDropLocation"/>
  </div>
</template>

<script>
import searchLocation from './searchLocation.vue'

export default {
  components: {
    searchLocation
  },
  methods: {
    getDropLocation (location) {
      this.$emit('dropLocation', location)
    }
  }
}
</script>

<style>

</style>
