<template>
  <div>
    <div class="place-order-form">
      <input type="text" v-model="orderDescription" 
        v-bind:placeholder="descriptionPlaceholder"
        class="place-order-form__description">
      <input-pick-up
        v-on:pickUpLocation="getPickUpLocation"/>
      <input-drop
        v-on:dropLocation="getDropLocation"/>
      <button v-on:click="placeOrder" class="place-order-form__submit">place</button>
    </div>
    <information
      v-bind:lessChars = "hasLessChars"
      v-bind:failedToPlace = "hasFailedToPlace"
      v-bind:inValidChars = "hasInvalidChars"
      v-bind:placedSuccess = "hasPlaced"
      />
  </div>
</template>

<script>
import information from '../status/placeOrderMessages/information.vue'
import inputPickUp from '../location/inputPickUp.vue'
import inputDrop from '../location/inputDrop.vue'
import vueInstance from '../../views/user/main.js'

export default {
  components: {
    information,
    inputPickUp,
    inputDrop
  },
  data() {
    return {
      orderDescription: '',
      descriptionPlaceholder: 'Type your order and click place',
      hasLessChars: false,
      hasFailedToPlace: false,
      hasInvalidChars: false,
      hasPlaced: false,
      postOrderUrl: 'http://localhost:8000/user/placeorder',
      pickUpLocation: {},
      dropLocation: {}
    }
  },
  methods: {
    async placeOrder() {
      let validatedResult = this.validateForm(this.orderDescription, this.pickUpLocation, this.dropLocation)
      if (validatedResult) {
        let body = this.constructOrderBody(this.orderDescription, this.pickUpLocation, this.dropLocation)
        let postResult = await this.postOrder(body)
        console.log(postResult)
      }
    },
    async postOrder(body) {
      let status = (await (await fetch(this.postOrderUrl, this.constructFetchBody(body))).json()).status
      return status
    },
    validateForm(description, pickup, drop) {
      if (description.length >= 10 && pickup.coords && drop.coords) return true
      return false
    },
    getPickUpLocation (location) {
      this.pickUpLocation.coords = location.coords
      this.pickUpLocation.address = location.address
    },
    getDropLocation (location) {
      this.dropLocation.coords = location.coords
      this.dropLocation.address = location.address
    },
    constructOrderBody (description, pickup, drop) {
      return {
        description: description,
        from: [pickup.coords.lng, pickup.coords.lat],
        to: [drop.coords.lng, drop.coords.lat],
        fromAddr: pickup.address,
        toAddr: drop.address
      }
    },
    constructFetchBody (body) {
      return {
        method: 'post',
        mode: 'cors',
        headers: {
          'authorization': document.cookie.split(';').map(e=>e.trim()).filter(e=>e.startsWith('access_token='))[0].substring(13),
          'content-type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    },
  }
}
</script>

<style>
</style>
