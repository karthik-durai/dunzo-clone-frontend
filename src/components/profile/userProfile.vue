<template>
  <div>
    <router-link to='/myProfile/menu'>menu</router-link>
    <router-view/>
    <p>profile vue</p>
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
