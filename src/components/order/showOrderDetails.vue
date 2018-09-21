<template>
  <div>
    <list-order-details
      v-bind:order="orderDetails"/>
    <track-runner
      v-bind:orderId="orderId"
      v-bind:socket="socket"/>
  </div>
</template>

<script>
import vueInstance from '../../views/user/main.js'
import listOrderDetails from './listOrderDetails.vue'
import trackRunner from '../runner/trackRunner.vue'

export default {
  props: ['socket'],
  components: {
    listOrderDetails,
    trackRunner
  },
  data() {
    return {
      orderDetails: {},
      orderDetailsUrl: 'http://localhost:8000/user/getOrderDetails?orderID='
    }
  },
  computed: {
    orderId() {
      return this.$route.params.id
    },
    getOrderDetailsUrl() {
      return `${this.orderDetailsUrl}${this.orderId}`
    },
  },
  methods: {
    async getOrderDetails (url) {
      try {
        return (await (await fetch(url, this.constructBodyToFetch())).json()).details
      } catch(e) {

      }
    },
    constructBodyToFetch() {
      return {
        headers: {
          'authorization': document.cookie.split(';').map(e=>e.trim()).filter(e=>e.startsWith('access_token='))[0].substring(13)
        }
      }
    }
  },
  async mounted() {
    this.orderDetails = await this.getOrderDetails(this.getOrderDetailsUrl)
  }
}
</script>

<style>

</style>
