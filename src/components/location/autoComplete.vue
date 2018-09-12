<template>
  <div>
    <input type="text" v-bind:placeholder="placeholder"
        class="place-order-form__from-address" 
        list="location-list"
        v-model="value"
        ref="addressInput">
    <p @click="test">getplace</p>
    <p @click="test1">getco</p>
  </div>
</template>

<script>
export default {
  props: ['placeholder'],
  data() {
    return {
      value: '',
      autocomplete: null
    }
  },
  methods: {
    test () {
      console.log(this.autocomplete.getPlace())
    },
    test1 () {
      let geoCoder = new google.maps.Geocoder()
      geoCoder.geocode({placeId: 'ChIJnQ6LHgUUrjsRnE_kgP4CRGU'}, (res, stat) => {
        console.log(res[0].geometry.location.lat(), res[0].geometry.location.lng())
      })
    },
    geoLocate () {
      return new Promise (function (resolve, reject) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(resolve, reject)
        }
      })
    },
    getCoOrdinates(position) {
      return { lat: position.coords.latitude, lng: position.coords.longitude }
    },
    createBounds(location, radius) {
      return new google.maps.Circle({
        center: location,
        radius: radius
      })
    },
    getAutoCompleteObject () {
      let options = {
        types: ['geocode'],
        placeIdOnly: true,
        componentRestrictions: {country: 'in'}
      }
      let input = this.$refs.addressInput
      return new google.maps.places.Autocomplete(input, options)
    }
  },
  watch: {
    value() {

    }
  },
  async mounted() {
    try {
      let position = await this.geoLocate()
      let servingArea = this.getCoOrdinates(position)
      let servingRadius = position.coords.accuracy
      let bounds = this.createBounds(servingArea, servingRadius)
      this.autocomplete = this.getAutoCompleteObject()
    } catch(err) {
      console.error(err)
    }
  }
}
</script>

<style>

</style>
