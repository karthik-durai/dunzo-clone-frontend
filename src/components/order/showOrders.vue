<template>
  <div class="orders-list-block">
    <ol class="order-list">
      <p v-if="orders.length===0">No Orders found</p>
      <li v-for="order of orders"
          v-bind:key="order._id"
          v-else>
        <orderList
        class="each-order"
        v-bind:order="order"
        v-on:getdetails="changeRoute"
        v-on:cancelorder="cancelOrder"/>
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
      ordersUrl: 'http://localhost:8000/user/getorders',
      urlCancelOrder : 'http://localhost:8000/user/cancelorder'
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
          'content-type': 'application/json',
          'authorization': document.cookie.split(';').map(e=>e.trim()).filter(e=>e.startsWith('access_token='))[0].substring(13)
        }
      }
    },
    async cancelOrder (orderID) {
      let order = (await (await fetch(this.urlCancelOrder, {...this.constructBodyToFetch(),
        method: 'post', 
        body: JSON.stringify({orderID: orderID})})).json())
      console.log(order)
    },
  }
}
</script>

<style>
.orders-list-block {
  color: #ffffff;
}

.order-list {
  list-style: none;
  padding-left: 0;
  text-align: center;
}

</style>
