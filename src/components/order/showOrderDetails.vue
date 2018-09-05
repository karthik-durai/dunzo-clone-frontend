<template>
  <div>
    <router-link v-bind:to="menuRoute">menu</router-link>
    <router-view/>
    <p>Order details page</p>
  </div>
</template>

<script>
import vueInstance from '../../views/user/main.js'

export default {
  computed: {
    menuRoute() {
      return `/showOrders/${ vueInstance.$route.params.id }/menu`
    }
  }
}
</script>

<style>

</style>
