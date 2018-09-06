<template>
  <div>
    <router-link to='/showOrders/menu'>menu</router-link>
    <router-view/>
    <ol>
      <li v-for="order of orders">
        <render-order
        v-bind:order="order"
        v-on:getdetails="changeRoute"/>
      </li>
    </ol>
  </div>
</template>

<script>
import renderOrder from './renderOrder.vue'
import vueInstance from '../../views/user/main.js'

export default {
  components: {
    renderOrder
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
      let orders = (await (await fetch(url)).json())
      return orders.message
    },
    changeRoute(orderId) {
      vueInstance.$router.push({ path: `${vueInstance.$route.path}/${orderId}` })
    }
  }
}
</script>

<style>

</style>
