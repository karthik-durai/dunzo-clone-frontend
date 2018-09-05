<template>
  <div>
    <router-link to='/showOrders/menu'>menu</router-link>
    <router-view/>
    <p>your orders</p>
  </div>
</template>

<script>
import userMenu from '../menu/userMenu.vue'
export default {
  components: {
    userMenu
  }
}
</script>

<style>

</style>
