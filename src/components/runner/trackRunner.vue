<template>
  <div id="map">
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: '',
      infoWindow: '',
      latAndLng: {lat: -34.397, lng: 150.644}
    }
  },
  methods: {
    initMap () {
      this.map = new window.google.maps.Map(document.getElementById('map'), 
      {center: this.latAndLng, zoom: 6 })
      navigator.geolocation.getCurrentPosition(this.currentPosition)
    },
    currentPosition (position) {
      let pos = { lat: position.coords.latitude, lng: position.coords.longitude }
      this.map.setCenter(pos)
    },
  },
  mounted() {
    this.initMap()
  }
}
</script>

<style>

</style>
