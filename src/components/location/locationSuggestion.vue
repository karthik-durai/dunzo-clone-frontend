<template>
  <div>
    <input type="text" v-bind:placeholder="placeholder"
        class="place-order-form__from-address" 
        list="location-list"
        v-model="value">
    <datalist id="location-list">
      <option>current location</option>
    </datalist>
  </div>
</template>

<script>
export default {
  props: ['placeholder'],
  data() {
    return {
      value: ''
    }
  },
  mathods: {
    getAddress () {
    }
  },
  watch: {
    value() {
      if (this.value === 'current location') {
        this.value = 'getting location'
        navigator.geolocation.getCurrentPosition(pos => {
          let latlng = { lat: pos.coords.latitude, lng: pos.coords.longitude }
          let geoCoder = new google.maps.Geocoder
          geoCoder.geocode({'location': latlng}, (result, status) => {
            console.log(result)
          })
        })
      }
    }
  }
}
</script>

<style>

</style>
