<template>
  <div v-on:click="$emit('getdetails', order._id)">
    <p>{{ order.status }}</p>
    <p>{{ order.description }}</p>
    <p>{{ order.placedOn }}</p>
    <button v-on:click.prevent="cancelOrder">cancel</button>
  </div>
</template>

<script>
export default {
  props: ['order'],
  data () {
    return {
      urlCancelOrder : 'http://localhost:8000/user/cancelorder',
    }
  },
  methods: {
    async cancelOrder () {
      let order = (await (await fetch(this.urlCancelOrder, this.constructBodyToFetch())).json())
    },
    constructBodyToFetch() {
      return {
        headers: {
          'authorization': document.cookie.split(';').map(e=>e.trim()).filter(e=>e.startsWith('access_token='))[0].substring(13)
        },
        method: 'post', 
        body: JSON.stringify({orderID: this.order._id})
      }
    }
  }
}
</script>

<style>

</style>
