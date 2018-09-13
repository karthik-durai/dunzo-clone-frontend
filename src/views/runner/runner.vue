<template>
  <router-view/>
</template>

<script>
export default {
  data() {
    return {
      lat: 0,
      lng: 0,
      socket: io('http://localhost:8000')
    }
  },
  methods: {
    getCoordinates() {
      navigator.geolocation.watchPosition(pos => {
        this.lat = pos.coords.latitude
        this.lng = pos.coords.longitude
        this.socket.emit('postion update', [this.lng, this.lat])
        console.log(this.lat, this.lng)
      })
    }
  },
  async mounted() {
    this.getCoordinates()
  },
}
</script>

<style>

</style>
