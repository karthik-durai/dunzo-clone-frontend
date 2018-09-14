<template>
  <router-view/>
</template>

<script>
export default {
  data() {
    return {
      lat: 77.644124,
      lng: 12.961531,
      socket: io('http://localhost:8000')
    }
  },
  methods: {
    getCoordinates() {
      // navigator.geolocation.watchPosition(pos => {
      //   this.lat = pos.coords.latitude
      //   this.lng = pos.coords.longitude
      //   this.socket.emit('position update', [this.lng, this.lat])
      //   console.log(this.lat, this.lng)
      // })

      function getRandom(min, max) {
        return Math.random() * (max - min) + min;
      }

      setInterval(
        () => {
          this.lat += getRandom(-.5, .5)
          this.lng += getRandom(-.5, .5)
          this.socket.emit('position update', [this.lng, this.lat])
          console.log(this.lat, this.lng)
        },
        1000
      )
    }
  },
  async mounted() {
    this.getCoordinates()
  },
}
</script>

<style>

</style>
