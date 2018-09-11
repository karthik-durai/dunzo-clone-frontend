<template>
  <div>
    <input type="number" v-model="lat">
    <div id="map" ref="map">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: '',
      // latAndLng: {lat: 12.9608311, lng: 76.64365539999994},
      lat: 12.9608311,
      lng: 76.64365539999994,
      marker: ''
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
    }
  },
  watch: {
    lat() {
      console.log(parseFloat(this.lat))
      this.marker.setMap(null)
      this.map.setCenter({ lat: parseFloat(this.lat), lng: this.lng })
      this.putMarker()
    }
  },
  mounted() {
    this.renderMap()
    this.putMarker()
  }
}
</script>

<style>
#map {
  width: 500px;
  height: 500px;
}

</style>
