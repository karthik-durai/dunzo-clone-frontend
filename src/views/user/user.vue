<template>
  <router-view
  v-on:coords="getCoords"
  v-bind:pickUpCoords="pickUpCoords"
  v-bind:dropCoords="dropCoords"/>
</template>

<script>
export default {
  data() {
    return {
      pickUpCoords: null, 
      dropCoords: null
    }
  },
  methods: {
    getCoords (data) {
      if (data[0] === 'provideDropAddress') {
        this.pickUpCoords = data[1]
      } else if (data[0] === 'providePickUpAddress') {
        this.dropCoords = data[1]
      }
    }
  }
}
</script>

<style>

</style>
