<template>
  <div>
    <router-link to="/">Place order</router-link>
    <h3>your orders</h3>
    <ol>
      <li></li>
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
      let fetched = await fetch('http://localhost:8000/user/getOrders')
      let orders = await fetched.json()
      return orders
    }
  },
  async mounted() {
    this.orders = await this.getOrders()
    console.log(this.orders)
  }
}
</script>

<style>

</style>
