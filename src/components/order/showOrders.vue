<template>
  <div>
    <div class="menu">
      <router-link to='/showOrders/menu' class="menu__button">&#9776;</router-link>
      <router-view/>
    </div>
    <ol>
      <li v-for="order of orders">
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
