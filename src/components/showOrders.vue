<template>
  <div>
    <router-link to="/">Place order</router-link>
    <ol>
      <li v-for="order in orders">{{ order.description }}</li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: []
    }
  },
  methods: {
    async getOrders() {
      try {
        let fetched = await fetch('http://localhost:8000/user/getOrders')
        let orders = await fetched.json()
        return orders
      } catch (err) {
        return error
      }
    }
  },
  async mounted() {
    this.orders = (await this.getOrders()).message
    console.log(this.orders)
  }
}
</script>

<style>

</style>
