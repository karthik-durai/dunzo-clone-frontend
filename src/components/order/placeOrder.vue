<template>
  <div class="place-order-component">
    <div class="place-order-form">
      <input type="text" v-model="orderDescription" 
        v-bind:placeholder="descriptionPlaceholder"
        class="place-order-form__description"
        v-on:input="removeStatusMessage"/>
        <pick-up-location
          v-on:coords="getPickUpLocation"/>
        <drop-location
          v-on:coords="getDropLocation"/>
      <button v-on:click="placeOrder" class="place-order-form__submitBtn"
        v-bind:disabled="disablePlaceBtn">place</button>
    </div>
    <place-order-status
      v-if="displayStatus" 
      v-bind:status="placementStatus"
      class="place-order__status"/>
  </div>
</template>

<script>
import placeOrderStatus from '../status/placeOrderStatus.vue'
import pickUpLocation from '../location/searchLocation.vue'
import dropLocation from '../location/searchLocation.vue'

export default {
  components: {
    placeOrderStatus,
    pickUpLocation,
    dropLocation
  },
  data() {
    return {
      orderDescription: '',
      descriptionPlaceholder: 'Type your order',
      postOrderUrl: 'http://localhost:8000/user/placeorder',
      pickUpLocation: {},
      dropLocation: {},
      displayStatus: false,
      placementStatus: [0, 0, 0],
      reset: false
    }
  },
  computed: {
    disablePlaceBtn() {
      return this.validateForm(this.orderDescription, this.pickUpLocation, this.dropLocation)
    }
  },
  methods: {
    removeStatusMessage() {
      this.displayStatus = false
    },
    async placeOrder() {
      let validatedResult = this.validateForm(this.orderDescription, this.pickUpLocation, this.dropLocation)
      if (!validatedResult) {  
        this.placementStatus = [1, 0, 0]
        return
      }
      try {
        let body = this.constructOrderBody(this.orderDescription, this.pickUpLocation, this.dropLocation)
        let postResult = await this.postOrder(body)
        this.placementStatus = [0, 1, 0]
      } catch(e) {
        this.placementStatus = [0, 0, 1]
      }
      this.displayStatus = true
      this.orderDescription = ''
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
  },
}
</script>

<style>
.place-order-component {
  display: grid;
  grid-template-rows: 80vh auto;
  margin-top: 1em;
}
.place-order-form {
  display: grid;
  grid-template-rows: repeat(4, auto);
  padding: 0 2em 0 2em;
}
.place-order-form__description {
  height: 50%;
  border: solid 5px;
}

.place-order-form__description::placeholder {
  text-align: center;
}

.place-order-form__description[type="text"] {
  font-size: 3em;
}

.place-order__status {
  text-align: center;
}

.place-order-form__submitBtn {
  font-size: 3em;
  /* border: solid 5px; */
  color: #000000;
  box-shadow: 1px 1px 5px #ffffff, -1px -1px 5px #ffffff;
}
</style>
