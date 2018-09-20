<template>
  <div>
    <p>{{ order.status }}</p>
    <p>{{ order.description }}</p>
    <p>Placed-On: {{ order.placedOn }}</p>
    <p>Order-Id: {{ order._id }}</p>
    <p>Pickup: {{ order.fromAddr }}</p>
    <p>Drop: {{ order.toAddr }}</p>
    <p>Runner: {{ runner }}</p>
    <button v-on:click="cancelOrder">cancel</button>
  </div>
</template>

<script>
export default {
  props: ['order'],
  data() {
    return {
      urlCancelOrder: 'http://localhost:8000/user/cancelorder'
    }
  },
  computed: {
    runner() {
      if (this.order.runner) return this.order.runner.name
      return 'not assigned'
    },
  },
  methods: {
    constructBodyToFetch() {
      return {
        headers: {
          'authorization': document.cookie.split(';').map(e=>e.trim()).filter(e=>e.startsWith('access_token='))[0].substring(13)
        },
        method: 'post', 
        body: JSON.stringify({orderID: this.order._id})
      }
    },
    async cancelOrder () {
      let order = (await (await fetch(this.urlCancelOrder, this.constructBodyToFetch())).json())
      console.log(order)
    }
  }
}
</script>

<style>

</style>
