<template>
  <div>
    <router-link to='/showOrders/menu'>menu</router-link>
    <router-view/>
    <ol>
      <li v-for="order of orders">
        <p>{{ order }}</p>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  components: {

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
    }
  }
}
</script>

<style>

</style>
