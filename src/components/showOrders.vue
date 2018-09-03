<template>
  <div>
    <router-link to="/">Place order</router-link>
    <div></div>
    <a href="http://localhost:8000/user/signout">sign out</a>
    <ol>
      <li v-for="order in orders" @click="getOrderDetails">{{ order.description }}</li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
    }
  },
  methods: {
    async getOrders() {
      try {
        let fetched = await fetch('http://localhost:8000/user/getOrders',  {
          credentials: 'same-origin'
        })
        let orders = await fetched.json()
        return orders
      } catch (err) {
        return err
      }
    },
    async getOrderDetails(e) {
      console.log(e.target.textContent)
      // try {
      //   let fetched = await fetch(`http://localhost:8000/user/getOrderDetails/${e.target.textContent}`)
      //   let orderDetails = await fetched.json()
      //   console.log(orderDetails)
      // } catch (err) {
      //   console.log(err)
      // }
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
