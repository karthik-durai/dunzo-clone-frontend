<template>
  <div class="placeOrderForm">
    <router-link to='/placeOrder/menu'>menu</router-link>
    <router-view/>
    <form action="">
      <input type="text">
      <button>place</button>
    </form>
  </div>
</template>

<script>
import userMenu from '../menu/userMenu.vue'

export default {
  components: {
    userMenu
  },
  mounted() {
    
  }
}
</script>

<style>

</style>
