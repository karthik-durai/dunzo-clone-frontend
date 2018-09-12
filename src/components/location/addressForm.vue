<template>
  <form>
    <input type="text" placeholder="door number" v-model="doorNumber">
    <input type="text" placeholder="street name" v-model="streetName">
    <input type="text" placeholder="locality" v-model="locality">
    <button @click.prevent="getCoords">ok</button> 
  </form>
</template>

<script>
import vueInstance from '../../views/user/main.js'

export default {
  data() {
    return {
      doorNumber: '',
      streetName: '',
      locality: ''
    }
  },
  methods: {
    async getCoords () {
      let address = this.composeAddress(this.doorNumber, this.streetName, this.locality)
      let geocoderObj = this.getGeocoder()
      let result = await this.obtainGeocode(geocoderObj, address)
      let lat = result.geometry.location.lat()
      let lng = result.geometry.location.lng()
      address = result.formatted_address
      this.$emit('coords', [this.addressType, { coords: { lat: lat, lng: lng }, address: address }])
      vueInstance.$router.go(-1)
    },
    composeAddress (num, st, loc) {
      return `${num}, ${st}, ${loc}, Bangalore`
    },
    getGeocoder () {
      return new google.maps.Geocoder()
    },
    obtainGeocode (geocoder, address) {
      return new Promise ((resolve, reject) => {
        geocoder.geocode( {'address': address}, (result, status) => {
          (status === 'OK') ? resolve(result[0]) : reject()
          }
        )
      })
    }
  },
  computed: {
    addressType() {
      return vueInstance.$route.path.split('/')[2]
    }
  }
}
</script>

<style>

</style>
