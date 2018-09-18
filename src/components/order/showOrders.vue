<template>
  <div>
    <ol>
      <li v-for="order of orders"
          v-bind:key="order._id">
        <orderList
        v-bind:order="order"
        v-on:getdetails="changeRoute"/>
      </li>
    </ol>
  </div>
</template>

<script>
import orderList from './orderList.vue'
import vueInstance from '../../views/user/main.js'

export default {
  components: {
    orderList
  },
  data() {
    return {
      orders: [],
      ordersUrl: 'http://localhost:8000/user/getorders'
    }
  },
  async mounted() {
    this.orders = await this.getOrders(this.ordersUrl)
  },
  methods: {
    async getOrders (url) {
      let orders = (await (await fetch(url, this.constructBodyToFetch())).json())
      return orders.message
    },
    changeRoute(orderId) {
      vueInstance.$router.push({ path: `showOrderDetails/${orderId}` })
    },
    constructBodyToFetch() {
      return {
        headers: {
          'authorization': document.cookie.split(';').map(e=>e.trim()).filter(e=>e.startsWith('access_token='))[0].substring(13)
        }
      }
    }
  }
}
</script>

<style>

</style>
