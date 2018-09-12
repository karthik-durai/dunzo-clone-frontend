<template>
  <div>
    <input type="text" v-bind:placeholder="placeholder"
        class="place-order-form__from-address" 
        v-model="value"
        ref="addressInput">
    <button v-on:click="emitCoords">ok</button>
  </div>
</template>

<script>
import vueInstance from '../../views/user/main.js'

export default {
  props: ['placeholder'],
  data() {
    return {
      value: '',
      autocomplete: null
    }
  },
  methods: {
    createBounds(location, radius) {
      return new google.maps.Circle({
        center: location,
        radius: radius
      })
    },
    getAutoCompleteObject (bounds) {
      let options = {
        types: ['geocode'],
        placeIdOnly: true,
        componentRestrictions: {country: 'in'}
      }
      let input = this.$refs.addressInput
      let autocomplete = new google.maps.places.Autocomplete(input, options)
      autocomplete.setBounds(bounds.getBounds())
      return autocomplete
    },
    async emitCoords () {
      let place = this.autocomplete.getPlace()
      let placeId = place.place_id
      let coords = await this.getCoords(placeId)
      let lat = coords.geometry.location.lat()
      let lng = coords.geometry.location.lng()
      let address = coords.formatted_address
      this.$emit('coords', [this.addressType, { coords: { lat: lat, lng: lng }, address: address }])
      vueInstance.$router.go(-1)
    },
    async getCoords (placeId) {
      let geoCoder = new google.maps.Geocoder()
      let geoCodeObj = await this.obtainGeocode(geoCoder, placeId)
      return geoCodeObj
    },
    obtainGeocode (geocoder, placeId) {
      return new Promise ((resolve, reject) => {
        geocoder.geocode( {placeId: placeId}, (result, status) => {
          (status === 'OK') ? resolve(result[0]) : reject()
          }
        )
      })
    }
  },
  async mounted() {
    try {
      let servingArea = {lat: 12.9833, lng: 77.5833}
      let servingRadius = 33000
      let bounds = this.createBounds(servingArea, servingRadius)
      this.autocomplete = this.getAutoCompleteObject(bounds)
    } catch(err) {
      console.error(err)
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
