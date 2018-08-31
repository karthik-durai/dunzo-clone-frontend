<template>
  <div>
    <p>dunzo-clone</p>
    <router-view></router-view>
  </div>
</template>

<script>
import placeOrder from '../../../components/placeOrder.vue'
import showOrders from '../../../components/showOrders.vue'

export default {
  name: 'orders',
  components: {
    placeOrder,
    showOrders,
  },
}
</script>

<style>

</style>
