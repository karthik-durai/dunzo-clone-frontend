<template>
  <div class="current-assignment-details">
    <p v-if="!order.description">No Assignments</p> 
    <div v-else>
      <p>Description: {{ order.description }}</p>
      <p>Placed-on: {{ order.placedOn }}</p>
      <p>Pickup: {{ order.fromAddr }}</p>
      <p>Drop: {{ order.toAddr }}</p>
      <button v-on:click="goToChat">Chat with user</button>
    </div>
      <button v-if="order.description" v-on:click="fulfillOrder">fulfill</button>
  </div>
</template>

<script>
import runnerMenu from '../menu/runnerMenu.vue'
import vueInstance from '../../views/runner/main.js'

export default {
  components: {
    runnerMenu
  },
  data() {
    return {
      currentOrderUrl: 'https://dunzoclone.now.sh/runner/currentOrder',
      fulfillOrderUrl: 'https://dunzoclone.now.sh/runner/fulfillorder',
      order: {},
    }
  },
  methods: {
    goToChat() {
      this.$router.push(`${this.$route.path}/chat`)
    },
    async getCurrentAssignments () {
      let fetchedObj = await fetch(this.currentOrderUrl, this.constructFetchBody())
      let order = await fetchedObj.json()
      return order
    },
    constructFetchBody() {
      return {
        mode: 'cors',
        headers: {
          authorization: document.cookie.split(';').map(e=>e.trim()).filter(e=>e.startsWith('access_token='))[0].substring(13),
          'content-type': 'application/json'
        }
      }
    },
    async fulfillOrder() {
      let fetchedObj = await fetch(this.fulfillOrderUrl, {...this.constructFetchBody(), method: 'post', body: JSON.stringify({orderID: this.order._id}) })
      console.log(await fetchedObj.json())
      this.order = await this.getCurrentAssignments()
    }
  },
  async mounted() {
    this.order = await this.getCurrentAssignments()
    console.log(this.order)
  },
}
</script>

<style>
.current-assignment-details {
  text-align: center;
  color: #ffffff;
}

</style>
