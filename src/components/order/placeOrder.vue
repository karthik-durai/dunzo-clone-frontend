<template>
  <div class="placeOrderForm">
    <router-link to='/placeOrder/menu'>menu</router-link>
    <router-view/>
    <form action="">
      <input type="text" v-model="orderDescription" v-bind:placeholder="placeholder">
      <button @click="placeOrder">place</button>
    </form>
    <information
      v-bind:lessChars = "hasLessChars"
      v-bind:failedToPlace = "hasFailedToPlace"
      v-bind:inValidChars = "hasInvalidChars"
      v-bind:placedSuccess = "hasPlaced"
      />
  </div>
</template>

<script>
import userMenu from '../menu/userMenu.vue'
import information from '../status/placeOrderMessages/information.vue'

export default {
  components: {
    userMenu,
    information
  },
  data() {
    return {
      orderDescription: '',
      placeholder: 'Type your order and click place',
      hasLessChars: false,
      hasFailedToPlace: false,
      hasInvalidChars: false,
      hasPlaced: false
    }
  },
  methods: {
    async placeOrder () {
      try{
     if (!this.checkIfLessChars()) {
       this.hasLessChars = false
       let statusObj = await fetch('http://localhost:8000/user/placeorder', this.constructBody())
       let status = (await statusObj.json()).status
       determineStatusMessage(status)
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
    constructBody () {
      return {
        method: 'post',
        mode: 'cors',
        header: {
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

</style>
