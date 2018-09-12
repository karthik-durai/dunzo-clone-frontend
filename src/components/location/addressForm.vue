<template>
  <input type="text" v-model="test">
</template>

<script>
export default {
  data() {
    return {
      test: ''
    }
  },
  watch: {
    test() {
      this.$emit('pickupAddress', this.test)
    }
  }
}
</script>

<style>

</style>
