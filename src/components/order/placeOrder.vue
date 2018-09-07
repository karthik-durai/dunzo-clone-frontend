<template>
  <div class="placeOrderForm">
    <div class="menu">
      <router-link to='/placeOrder/menu' class="menu__button">&#9776;</router-link>
      <router-view/>
    </div>
    <div class="place-order-form">
      <input type="text" v-model="orderDescription" v-bind:placeholder="placeholder"
        class="place-order-form__input">
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

export default {
  components: {
    information
  },
  data() {
    return {
      orderDescription: '',
      placeholder: 'Type your order and click place',
      hasLessChars: false,
      hasFailedToPlace: false,
      hasInvalidChars: false,
      hasPlaced: false,
      postOrderUrl: 'http://localhost:8000/user/placeorder'
    }
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
          'Content-Type': 'application/json'
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
    }
  }
}
</script>

<style>
.menu {
  border: solid;
  background-color: #070201;
}
.menu__button {
  text-decoration: none;
  font-size: 2em;
}
.place-order-form {
  margin: 1em;
  display: flex;
}
.place-order-form__input {
  flex: 1;
}
</style>
