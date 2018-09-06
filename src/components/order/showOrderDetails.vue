<template>
  <div>
    <router-link v-bind:to="menuRoute">menu</router-link>
    <router-view/>
    <p>{{ orderDetails }}</p>
  </div>
</template>

<script>
import vueInstance from '../../views/user/main.js'

export default {
  data() {
    return {
      orderDetails: null,
      orderDetailsUrl: 'http://localhost:8000/user/getOrderDetails?orderID='
    }
  },
  computed: {
    menuRoute() {
      return `/showOrders/${ vueInstance.$route.params.id }/menu`
    },
    getOrderDetailsUrl() {
      return `${this.orderDetailsUrl}${vueInstance.$route.params.id}`
    }
  },
  methods: {
    async getOrderDetails (url) {
      try {
        return (await (await fetch(url)).json()).details
      } catch(e) {
        console.log('error', e)
      }
    }
  },
  async mounted() {
    this.orderDetails = await this.getOrderDetails(this.getOrderDetailsUrl)
    console.log(this.orderDetails)
  }
}
</script>

<style>

</style>
