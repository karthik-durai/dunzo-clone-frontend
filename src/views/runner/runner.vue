<template>
  <router-view/>
</template>

<script>
export default {
  data() {
    return {
      lat: 0,
      lng: 0
    }
  },
  methods: {
    getCoordinates() {
      return new Promise ((resolve, reject) => {
        navigator.geolocation.watchPosition(resolve, reject)
      })
    }
  },
  async mounted() {
    let position = await this.getCoordinates()
    let lat = position.coords.latitude
    let lng = position.coords.longitude
  },
  watch: {
    lat() {
      console.log(this.lat)
    },
    lng() {
      console.log(this.lng)
    }
  }
}
</script>

<style>

</style>
