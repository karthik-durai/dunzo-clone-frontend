<template>
  <div class="address-input-block">
    <input type="text" v-bind:placeholder="placeholder" 
        v-model="value"
        ref="addressInput"
        class="address-input-field">
  </div>
</template>

<script>
import vueInstance from '../../views/user/main.js'

export default {
  data() {
    return {
      value: '',
      autocomplete: null,
      intervalID: null,
      placeholder: 'Enter a location'
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
      autocomplete.addListener('place_changed', this.emitCoords)
      return autocomplete
    },
    async emitCoords () {
      let place = this.autocomplete.getPlace()
      let placeId = place.place_id
      let coords = await this.getCoords(placeId)
      let lat = coords.geometry.location.lat()
      let lng = coords.geometry.location.lng()
      let address = coords.formatted_address
      this.$emit('coords', { coords: { lat: lat, lng: lng }, address: address })
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
    },
    async createAutoComplete () {
      try {
      let servingArea = {lat: 12.9833, lng: 77.5833}
      let servingRadius = 100000
      let bounds = this.createBounds(servingArea, servingRadius)
      this.autocomplete = this.getAutoCompleteObject(bounds)
    } catch(err) {
      console.error(err)
    }
    },
    checkForGoogle () {
      if (google) { 
        this.createAutoComplete()
        clearInterval(this.intervalID)
      }
    }
  },
  async mounted() {
    this.intervalID = setInterval(this.checkForGoogle, 3000)
  }
}
</script>

<style>
.address-input-field {
  height: 10vh;
  width: 100%;
  border: solid 5px;
}

.address-input-field[type="text"] {
  font-size: 3em;
  text-align: center;
}
</style>
