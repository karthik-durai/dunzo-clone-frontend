<template>
  <div>
    <router-link v-bind:to="menuRoute">menu</router-link>
    <router-view/>
    <p>runner info</p>
  </div>
</template>

<script>
import vueInstance from '../../views/user/main.js'

export default {
  computed: {
    menuRoute() {
      return `/showOrders/${ vueInstance.$route.params.id }/runnerInfo/menu`
    }
  }
}
</script>

<style>

</style>
