<template>
  <router-view
  v-on:coords="getCoords"
  v-bind:pickUpLocation="pickUpLocation"
  v-bind:dropLocation="dropLocation"/>
</template>

<script>
export default {
  data() {
    return {
      pickUpLocation: null, 
      dropLocation: null
    }
  },
  methods: {
    getCoords (data) {
      console.log('here', data)
      if (data[0] === 'provideDropAddress') {
        this.dropLocation = data[1]
      } else if (data[0] === 'providePickUpAddress') {
        this.pickUpLocation = data[1]
      }
    }
  }
}
</script>

<style>

</style>
