<template>
  <div>
    <div class="menu">
      <router-link to='/placeOrder/menu' class="menu__button">&#9776;</router-link>
      <router-view/>
    </div>
    <div class="place-order-form">
      <input type="text" v-model="orderDescription" 
        v-bind:placeholder="descriptionPlaceholder"
        class="place-order-form__description">
      <input-pick-up
        v-on:input-type="renderInputComponent"/>
      <button @click="placeOrder" class="place-order-form__submit">place</button>
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
import vueInstance from '../../views/user/main.js'

export default {
  props: ['coords'],
  components: {
    information,
    inputPickUp,
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
      latitude: 0,
      longitude: 0,
    }
  },
  mounted() {
    console.log(this.coords)
  },
  methods: {
    async placeOrder () {
      try{
        if (!this.checkIfLessChars()) {
          this.hasLessChars = false
          let status = (await 
            (await fetch(this.postOrderUrl, this.constructBodyToPost()))
            .json()).status
          this.determineStatusMessage(status)
        } else {
          this.hasLessChars = true
        }
      } catch (err) {
          this.hasFailedToPlace = true
      }
    },
    checkIfLessChars () {
      return this.orderDescription.length <= 10 ? true : false
    },
    checkIfInvalidChars () {
      return false
    },
    constructBodyToPost () {
      return {
        method: 'post',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': document.cookie.split(';')[1].split('=')[1]
        },
        body: JSON.stringify({description: this.orderDescription})
      }
    },
    determineStatusMessage (status) {
      if (status) {
        this.hasPlaced = true
        this.hasFailedToPlace = false
      } else {
        this.hasFailedToPlace = true
        this.hasPlaced = false
      }
    },
    renderInputComponent (inputType) {
      vueInstance.$router.push({ path: `${vueInstance.$route.path}/${inputType}`})
    }
  }
}
</script>

<style>
</style>
