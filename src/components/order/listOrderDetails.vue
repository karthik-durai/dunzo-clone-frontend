<template>
  <div class="order-details-block">
    <p>{{ order.status }}</p>
    <p>{{ order.description }}</p>
    <p>Placed-On: {{ order.placedOn }}</p>
    <p>Order-Id: {{ order._id }}</p>
    <p>Pickup: {{ order.fromAddr }}</p>
    <p>Drop: {{ order.toAddr }}</p>
    <p>Runner: {{ runner }}</p>
    <button v-on:click="cancelOrder" v-bind:disabled="disabledCancelBtn">cancel</button>
    <button v-on:click="goToChat" v-bind:disabled="disabledChat">chat with runner</button>
  </div>
</template>

<script>
export default {
  props: ['order'],
  data() {
    return {
      urlCancelOrder: 'https://dunzoclone.now.sh/user/cancelorder'
    }
  },
  computed: {
    runner() {
      if (this.order.runner) return this.order.runner.name
      return 'not assigned'
    },
    disabledChat() {
      if (this.order.status === 'assigned' || this.order.status === 'fulfilled') return false
      return true
    },
    disabledCancelBtn() {
      if (this.order.status === 'assigned') return false
      return true
    }
  },
  methods: {
    constructBodyToFetch() {
      return {
        headers: {
          'content-type': 'application/json',
          'authorization': document.cookie.split(';').map(e=>e.trim()).filter(e=>e.startsWith('access_token='))[0].substring(13)
        },
        method: 'post', 
        body: JSON.stringify({orderID: this.order._id})
      }
    },
    async cancelOrder () {
      let order = (await (await fetch(this.urlCancelOrder, this.constructBodyToFetch())).json())
      console.log(order)
    },
    goToChat () {
      this.$router.push(`${this.$route.path}/chat`)
    }
  }
}
</script>

<style>
.order-details-block {
  color: #ffffff;
  text-align: center;
  font-size: 6vw;
}

</style>
