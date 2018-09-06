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
      orderDetails: null
    }
  },
  computed: {
    menuRoute() {
      return `/showOrders/${ vueInstance.$route.params.id }/menu`
    },
    getOrderDetailsUrl() {
      return `http://localhost:8000/user/getOrderDetails?orderID=${vueInstance.$route.params.id}`
    }
  },
  methods: {
    async getOrderDetails (url) {
      return (await (await fetch(url)).json()).details
    }
  },
  async mounted() {
    this.orderDetails = await this.getOrderDetails(this.getOrderDetailsUrl)
  }
}
</script>

<style>

</style>
