<template>
  <div class="order-details">
    <div class="menu">
      <router-link v-bind:to="menuRoute" class="menu__button">&#9776;</router-link>
      <router-view/>
    </div>
    <list-order-details
      v-bind:order="orderDetails"
      class="each-order"/>
    <track-runner
      class="tracker-map"/>
  </div>
</template>

<script>
import vueInstance from '../../views/user/main.js'
import listOrderDetails from './listOrderDetails.vue'
import trackRunner from '../runner/trackRunner.vue'

export default {
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
        return (await (await fetch(url, this.constructBodyToFetch())).json()).details
      } catch(e) {
        console.log('error', e)
      }
    },
    constructBodyToFetch() {
      return {
        headers: {
          'Authorization': document.cookie.split(';')[1].split('=')[1]
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
.order-details {
  height: inherit;
  display: flex;
  flex-direction: column;
}

.each-order {
  flex: 1;
}

.tracker-map>div {
  width: 300px;
  height: 300px;
  flex: 2;
  border: solid;
  position: relative
}

</style>
