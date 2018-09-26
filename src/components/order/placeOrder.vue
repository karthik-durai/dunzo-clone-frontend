<template>
  <div class="place-order-component">
    <div class="place-order-form">
      <div class="place-order-form__description">
        <input type="text" v-model="orderDescription" 
          v-bind:placeholder="descriptionPlaceholder"
          v-on:input="removeStatusMessage"
          class="place-order-form__input"/>
        </div>
        <pick-up-location
          v-on:coords="getPickUpLocation"
          v-bind:placeholder="pickupPlaceholder"/>
        <drop-location
          v-on:coords="getDropLocation"
          v-bind:placeholder="dropPlaceholder"/>
        <div class="place-order-form__submitBlock">
          <button v-on:click="placeOrder"
            class="place-order-form__submitBtn">place</button>
        </div>
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
      postOrderUrl: 'https://dunzoclone.now.sh/user/placeorder',
      pickUpLocation: {},
      dropLocation: {},
      displayStatus: false,
      placementStatus: [0, 0, 0],
      reset: false,
      pickupPlaceholder: 'Enter Pickup location',
      dropPlaceholder: 'Enter Drop location'
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
  display: flex;
  width: 90%;
  margin: auto;
}
.place-order-form {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  width: 100%;
}
.place-order-form__description, .address-input-block, .place-order-form__submitBlock {
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.place-order-form__input {
  width: 95%;
  height: 40%;
  font-size: 3em;
}

.place-order-form__input::placeholder {
  text-align: center;
}

.place-order__status {
  flex: 1;
}

.place-order-form__submitBtn {
  width: 95%;
  font-size: 3em;
}
</style>
