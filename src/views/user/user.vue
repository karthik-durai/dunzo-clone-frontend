<template>
  <router-view
  v-on:pickupAddress="test"
  v-bind:coords="text"/>
</template>

<script>
export default {
  data() {
    return {
      text:''
    }
  },
  methods: {
    test (e) {
      this.text = e
    }
  }
}
</script>

<style>

</style>
