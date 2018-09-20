<template>
  <div>
    <div id="map" ref="map">
    </div>
  </div>
</template>

<script>
export default {
  props: ['orderId', 'socket'],
  data() {
    return {
      map: null,
      lat: 12.9608311,
      lng: 76.64365539999994,
      marker: null,
      intervalID: null
    }
  },
  methods: {
    renderMap () {
      this.map = new google.maps.Map(this.$refs.map, 
      {center: { lat: this.lat, lng: this.lng }, zoom: 13})
    },
    putMarker () {
      this.marker = new google.maps.Marker({
        map: this.map,
        position: { lat: parseFloat(this.lat), lng: this.lng },
        optimized: false
      })
    },
    dropMarker () {
      this.marker.setMap(null)
      this.map.setCenter({ lat: parseFloat(this.lat), lng: parseFloat(this.lng) })
      this.putMarker()
    },
    electrifyMap () {
      this.renderMap()
      this.putMarker()
      this.socket.emit('position request', this.orderId)
      this.socket.on('runner position', (pos) => {
        console.log('runner position', pos)
        this.lng = pos[1]
        this.lat = pos[0]
      })
    },
    checkForGoogle () {
      if (google) { 
        this.electrifyMap()
        clearInterval(this.intervalID)
      }
    }
  },
  watch: {
    lat() {
      this.dropMarker()
    },
    lng() {
      this.dropMarker()
    },
  },
  mounted() {
    this.intervalID = setInterval(this.checkForGoogle, 3000)
  }
}
</script>

<style>
#map {
  width: 500px;
  height: 500px;
}

</style>
