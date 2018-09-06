<template>
  <div>
    <router-link v-bind:to="menuRoute">menu</router-link>
    <router-view/>
    <p>assignment details</p>
  </div>
</template>

<script>
import vueInstance from '../../views/user/main.js'

export default {
  computed: {
    menuRoute() {
      return `/showAssignments/${ vueInstance.$route.params.id }/menu`
    }
  }

}
</script>

<style>

</style>
